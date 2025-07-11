import { useParams } from "react-router-dom";

import { useBook } from "../hooks/useBook";
import { useBookCover } from "../hooks/useBookCover";
import { extractCoverId } from "../utils/bookProcess";
import styles from "./BookPage.module.scss";

import NavBar from "../components/NavBar";
import Loader from "../components/Loader";

function BookPage() {
  const { bookId } = useParams();
  const { book, isLoading } = useBook(bookId);
  const { coverURL, isCoverLoading, setIsCoverLoading } = useBookCover(
    extractCoverId(book),
    "L"
  );

  // TODO DELETE THESE DEBUG LOGS
  // console.log("book");
  // console.log(book);

  return (
    <main className={styles.bookPage}>
      <NavBar />
      <section>
        {isCoverLoading && <Loader />}
        <img
          src={coverURL || "no-image.png"}
          alt={isCoverLoading ? "" : `${book?.title} cover image`}
          onLoad={() => setIsCoverLoading(false)}
        />
      </section>

      <section className={styles.infoSection}>
        {/* TODO NEXT keep including info and styling */}
        <h3>{book?.title}</h3>
        <p>{book?.description}</p>
      </section>
    </main>
  );
}

export default BookPage;
