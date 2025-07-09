import { BrowserRouter, Routes, Route } from "react-router-dom";
import DevelopmentPage from "../pages/DevelopmentPage";
import HomePage from "../pages/HomePage";
import ListPage from "../pages/ListPage";
import BookPage from "../pages/BookPage";
import AuthorPage from "../pages/AuthorPage";
import Message from "./Message";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
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
