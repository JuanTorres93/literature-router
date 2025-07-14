import { createContext, useContext, useEffect, useReducer } from "react";
import { useFetch } from "../hooks/useFetch";
import { API_BASE_URL } from "../config";

const initialState = {
  searchResults: [],
  searchQuery: "",
  fetchingSearchResults: false,
  wishedBooks: localStorage.getItem("wishedBooks")
    ? JSON.parse(localStorage.getItem("wishedBooks"))
    : [],
  readBooks: localStorage.getItem("readBooks")
    ? JSON.parse(localStorage.getItem("readBooks"))
    : [],
};

function reducer(state, action) {
  switch (action.type) {
    case "setSearchQuery":
      return {
        ...state,
        searchQuery: action.payload,
      };

    case "setSearchResults":
      return {
        ...state,
        searchResults: action.payload,
      };

    case "setFetchingSearchResults":
      return {
        ...state,
        fetchingSearchResults: action.payload,
      };

    case "addWishedBook": {
      // Check if the book is already wished
      const isAlreadyWished = state.wishedBooks.some(
        (wishedBook) => wishedBook.bookId === action.payload.bookId
      );

      if (isAlreadyWished) return state;

      const wishedBooks = [...state.wishedBooks, action.payload];
      localStorage.setItem("wishedBooks", JSON.stringify(wishedBooks));
      return {
        ...state,
        wishedBooks,
      };
    }

    case "removeWishedBook": {
      const wishedBooks = state.wishedBooks.filter(
        (wishedBook) => wishedBook.bookId !== action.payload.bookId
      );
      localStorage.setItem("wishedBooks", JSON.stringify(wishedBooks));
      return {
        ...state,
        wishedBooks,
      };
    }

    case "addReadBook": {
      // Check if the book is already read
      const isAlreadyRead = state.readBooks.some(
        (readBook) => readBook.bookId === action.payload.bookId
      );

      if (isAlreadyRead) return state;

      const readBooks = [...state.readBooks, action.payload];
      localStorage.setItem("readBooks", JSON.stringify(readBooks));
      return {
        ...state,
        readBooks,
      };
    }

    case "removeReadBook": {
      const readBooks = state.readBooks.filter(
        (readBook) => readBook.bookId !== action.payload.bookId
      );
      localStorage.setItem("readBooks", JSON.stringify(readBooks));
      return {
        ...state,
        readBooks,
      };
    }

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

// Create a new context
const BooksContext = createContext();

function BooksProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { results: fetchedResults, isLoading: fetchingBooks } = useFetch(
    `${API_BASE_URL}/search.json?q=${state.searchQuery}&limit=7`,
    initialState.searchResults
  );

  useEffect(() => {
    const foundResults = fetchedResults.numFound > 0 ? fetchedResults.docs : [];
    const results = foundResults.map((result) => {
      return {
        id: result.key.split("/").pop(),
        // NOTE: can be multiple authors, but I'm not going to handle it in this app
        authorId: result.author_key && result.author_key[0],
        title: result.title ? result.title : "",
      };
    });
    dispatch({ type: "setSearchResults", payload: results });
  }, [dispatch, fetchedResults]);

  useEffect(() => {
    dispatch({
      type: "setFetchingSearchResults",
      payload: fetchingBooks,
    });
  }, [fetchingBooks]);

  return (
    // Provide the context value to child components
    <BooksContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </BooksContext.Provider>
  );
}

// Custom hook to make it easier to consume the context
export function useBooks() {
  const value = useContext(BooksContext);

  if (value === undefined) {
    throw new Error("useBooks must be used within a BooksProvider");
  }
  return value;
}

export default BooksProvider;
