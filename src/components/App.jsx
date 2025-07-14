import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "../pages/HomePage";
import ListPage from "../pages/ListPage";
import BookPage from "../pages/BookPage";
import AuthorPage from "../pages/AuthorPage";
import Message from "./Message/Message";
import BookCard from "./BookCard/BookCard";
import { useBooks } from "../contexts/BooksContext";

function App() {
  const { state, dispatch } = useBooks();

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
          {/* NOTE: These 2 child routes could be implemented in a better, more elegant way. The sole reason I'm doing it this way is to use nested routes. */}
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
