import { BrowserRouter, Routes, Route } from "react-router-dom";
import DevelopmentPage from "../pages/DevelopmentPage";
import HomePage from "../pages/HomePage";
import NavBar from "./NavBar";
import Message from "./Message";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* TODO create actual page */}
        <Route path="/" element={<HomePage />} />
        <Route
          path="/fav-books"
          // TODO create actual page
          element={
            <>
              <NavBar />
              <p>Fav books!</p>
            </>
          }
        />
        <Route
          path="/fav-authors"
          // TODO create actual page
          element={
            <>
              <NavBar />
              <p>Fav authors!</p>
            </>
          }
        />
        {/* TODO IMPORTANT comment when finshed or add conditional render with NODE_ENV */}
        <Route path="/development" element={<DevelopmentPage />} />

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
