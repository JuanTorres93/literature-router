import { useParams } from "react-router-dom";

import { useBook } from "../hooks/useBook";
import { useBookCover } from "../hooks/useBookCover";
import { extractCoverId } from "../utils/bookProcess";
import styles from "./BookPage.module.scss";

import NavBar from "../components/NavBar/NavBar";
import Loader from "../components/Loader/Loader";
import ColoredListItem from "../components/ColoredListItem/ColoredListItem";

function BookPage() {
  const { bookId } = useParams();
  const { book, isLoading } = useBook(bookId);
  const { coverURL, isCoverLoading, setIsCoverLoading } = useBookCover(
    extractCoverId(book),
    "L"
  );

  return (
    <main className={styles.bookPage}>
      <NavBar />
      <section>
        {(isCoverLoading || isLoading) && <Loader type="loader-square" />}
        <img
          src={coverURL || "no-image.png"}
          alt={isCoverLoading ? "" : `${book?.title} cover image`}
          onLoad={() => setIsCoverLoading(false)}
        />
      </section>

      <section className={styles.infoSection}>
        <h3 className={styles.bookTitle}>{book?.title}</h3>

        <section>
          <h4 className={styles.sectionTitle}>Description</h4>
          <p>{book?.description || "No description available."}</p>
        </section>

        {book?.subjects && book.subjects.length > 0 && (
          <section>
            <h4 className={styles.sectionTitle}>Subjects</h4>
            <ul className={styles.list}>
              {book?.subjects
                // Filter subjects that are technical or not relevant
                ?.filter((subject) => !subject.includes("="))
                .filter((subject) => !subject.includes(":"))
                .map((subject, index) => (
                  <ColoredListItem key={index}>{subject}</ColoredListItem>
                ))}
            </ul>
          </section>
        )}

        {book?.links && book.links.length > 0 && (
          <section>
            <h4 className={styles.sectionTitle}>Links</h4>
            <ul className={styles.list}>
              {book?.links?.map((link, index) => (
                <ColoredListItem key={index}>
                  <a href={link.url} target="_blank" rel="noopener noreferrer">
                    {link.title}
                  </a>
                </ColoredListItem>
              ))}
            </ul>
          </section>
        )}
      </section>
    </main>
  );
}

export default BookPage;
