export const initialState = {
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

export function reducer(state, action) {
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
