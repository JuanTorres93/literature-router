import { useReducer, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { API_BASE_URL } from "../config";
import { initialState, reducer } from "../appReducer";

import HomePage from "../pages/HomePage";
import ListPage from "../pages/ListPage";
import BookPage from "../pages/BookPage";
import AuthorPage from "../pages/AuthorPage";
import Message from "./Message/Message";
import BookCard from "./BookCard/BookCard";

import { useFetch } from "../hooks/useFetch";

function App() {
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
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<HomePage state={state} dispatch={dispatch} />}
        />

        <Route
          path="books/:type"
          element={<ListPage state={state} dispatch={dispatch} />}
        />
        <Route path="books">
          {/* NOTE: These 2 child routes could be implemented in a better, more elegant
          way. The sole reason I'm doing it this way is to use nested routes. */}
          <Route
            path="wished"
            element={
              <ListPage>
                {state.wishedBooks.length > 0 &&
                  state.wishedBooks.map((wb) => (
                    <BookCard
                      key={wb.bookId}
                      bookId={wb.bookId}
                      coverId={wb.coverId}
                      type={"wished"}
                      dispatch={dispatch}
                    />
                  ))}
              </ListPage>
            }
          />

          <Route
            path="read"
            element={
              <ListPage>
                {state.readBooks.length > 0 &&
                  state.readBooks.map((rb) => (
                    <BookCard
                      key={rb.bookId}
                      bookId={rb.bookId}
                      coverId={rb.coverId}
                      type={"read"}
                      dispatch={dispatch}
                    />
                  ))}
              </ListPage>
            }
          />
        </Route>
        <Route path="book/:bookId" element={<BookPage />} />
        <Route path="author/:authorId" element={<AuthorPage />} />

        {/* Not found route */}
        <Route
          path="*"
          // TODO create actual page (Not relevant to this project)
          element={<Message type="error">This page does not exist</Message>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
