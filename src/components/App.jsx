import { BrowserRouter, Routes, Route } from "react-router-dom";
import DevelopmentPage from "../pages/DevelopmentPage";
import NavBar from "./NavBar";
import Message from "./Message";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* TODO create actual page */}
        <Route index element={<DevelopmentPage />} />
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
