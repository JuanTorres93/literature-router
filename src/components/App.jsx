import { BrowserRouter, Routes, Route } from "react-router-dom";
import DevelopmentPage from "../pages/DevelopmentPage";
import HomePage from "../pages/HomePage";
import FavPage from "../pages/FavPage";
import NavBar from "./NavBar";
import Message from "./Message";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="fav">
          <Route path="books" element={<FavPage />} />
          <Route
            path="authors"
            // TODO create actual page
            element={
              <>
                <NavBar />
                <p>Fav authors!</p>
              </>
            }
          />
        </Route>
        {/* TODO IMPORTANT comment when finshed or add conditional render with NODE_ENV */}
        <Route path="development" element={<DevelopmentPage />} />

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
