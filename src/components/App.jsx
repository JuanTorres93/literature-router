import { useReducer, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { API_BASE_URL } from "../config";

import DevelopmentPage from "../pages/DevelopmentPage";
import HomePage from "../pages/HomePage";
import ListPage from "../pages/ListPage";
import BookPage from "../pages/BookPage";
import AuthorPage from "../pages/AuthorPage";
import Message from "./Message";

import { useFetch } from "../hooks/useFetch";

const initialState = {
  searchResults: [],
  searchQuery: "",
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
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { results: fetchedResults } = useFetch(
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

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<HomePage state={state} dispatch={dispatch} />}
        />
        {/* TODO handle invalid parameters in routes */}
        <Route path="books/:type" element={<ListPage />} />
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
