import { useReducer, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { API_BASE_URL } from "../config";

import DevelopmentPage from "../pages/DevelopmentPage";
import HomePage from "../pages/HomePage";
import ListPage from "../pages/ListPage";
import BookPage from "../pages/BookPage";
import AuthorPage from "../pages/AuthorPage";
import Message from "./Message/Message";

import { useFetch } from "../hooks/useFetch";

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

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { results: fetchedResults, isLoading: fetchingBooks } = useFetch(
    `${API_BASE_URL}/search.json?q=${state.searchQuery}&limit=10`,
    initialState.searchResults
  );

  useEffect(() => {
    const foundResults = fetchedResults.numFound > 0 ? fetchedResults.docs : [];
    const results = foundResults.map((result) => {
      return {
        id: result.key.split("/").pop(),
        // NOTE: can be multiple authors, but I'm not going to handle it in this app
        authorId: result.author_key && result.author_key[0],
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
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<HomePage state={state} dispatch={dispatch} />}
        />
        {/* TODO handle invalid parameters in routes */}
        <Route
          path="books/:type"
          element={<ListPage state={state} dispatch={dispatch} />}
        />
        <Route path="book/:bookId" element={<BookPage />} />
        <Route path="author/:authorId" element={<AuthorPage />} />

        {/* TODO IMPORTANT comment when finshed or add conditional render with NODE_ENV */}
        <Route path="development" element={<DevelopmentPage />} />
        {/* Not found route */}
        <Route
          path="*"
          // TODO create actual page
          element={<Message type="error">This page does not exist</Message>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
