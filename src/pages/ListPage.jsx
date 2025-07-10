import { useParams, useNavigate } from "react-router-dom";
import styles from "./ListPage.module.scss";

import NavBar from "../components/NavBar";
import BookCard from "../components/BookCard";

function ListPage({ state, dispatch }) {
  const navigate = useNavigate();
  const { type } = useParams();

  // TODO use type to select one list or another

  return (
    <main className={styles.listPage}>
      <NavBar />

      <>
        {type === "wished" &&
          state.wishedBooks.length > 0 &&
          state.wishedBooks.map((wb) => (
            <BookCard
              key={wb.bookId}
              bookId={wb.bookId}
              coverId={wb.coverId}
              dispatch={dispatch}
              onClick={() => navigate(`/book/${wb.bookId}`)}
            />
          ))}
      </>
    </main>
  );
}

export default ListPage;
