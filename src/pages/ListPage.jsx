import { useParams, useNavigate } from "react-router-dom";
import styles from "./ListPage.module.scss";

import NavBar from "../components/NavBar/NavBar";
import BookCard from "../components/BookCard/BookCard";

function ListPage({ state, dispatch }) {
  const navigate = useNavigate();
  const { type } = useParams();

  // if type not in ["wished", "read"], redirect to home
  if (!["wished", "read"].includes(type)) {
    navigate("/");
    return null;
  }

  return (
    <main className={styles.listPage}>
      <NavBar />

      {type === "wished" &&
        state.wishedBooks.length > 0 &&
        state.wishedBooks.map((wb) => (
          <BookCard
            key={wb.bookId}
            bookId={wb.bookId}
            coverId={wb.coverId}
            dispatch={dispatch}
          />
        ))}

      {type === "read" &&
        state.readBooks.length > 0 &&
        state.readBooks.map((rb) => (
          <BookCard
            key={rb.bookId}
            bookId={rb.bookId}
            coverId={rb.coverId}
            dispatch={dispatch}
          />
        ))}
    </main>
  );
}

export default ListPage;
