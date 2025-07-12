import { useParams, useNavigate } from "react-router-dom";

import { useAuthor } from "../hooks/useAuthor";
import { useBook } from "../hooks/useBook";
import { useBookCover } from "../hooks/useBookCover";
import {
  extractCoverId,
  extractAuthorId,
  extractDescription,
} from "../utils/bookProcess";
import styles from "./BookPage.module.scss";

import NavBar from "../components/NavBar/NavBar";
import Loader from "../components/Loader/Loader";
import ColoredListItem from "../components/ColoredListItem/ColoredListItem";
import URLImg from "../components/URLImg/URLImg";

function BookPage() {
  const navigate = useNavigate();

  const { bookId } = useParams();
  const { book, isLoading } = useBook(bookId);
  const { coverURL } = useBookCover(extractCoverId(book), "L");
  const authorId = extractAuthorId(book);
  const { author, isLoading: isAuthorLoading } = useAuthor(authorId);

  // TODO DELETE THESE DEBUG LOGS
  console.log("book");
  console.log(book);

  return (
    <main className={styles.bookPage}>
      <NavBar />

      <section>
        <URLImg
          imgURL={coverURL}
          altText={`${book?.title} cover image`}
          loaderElement={<Loader type="loader-square" />}
        />
      </section>

      <section className={styles.infoSection}>
        {isLoading ? (
          <Loader type="loader-square" />
        ) : (
          <>
            <h3 className={styles.bookTitle}>
              {book?.title}

              <span className={styles.authorName}>
                {isAuthorLoading ? "" : " by "}
                <em onClick={() => navigate(`/author/${authorId}`)}>
                  {isAuthorLoading ? "..." : author?.name}
                </em>
              </span>
            </h3>

            <section>
              <h4 className={styles.sectionTitle}>Description</h4>
              <p>{extractDescription(book)}</p>
            </section>

            {book?.subjects && book.subjects.length > 0 && (
              <section>
                <h4 className={styles.sectionTitle}>Subjects</h4>
                {isLoading ? (
                  <Loader />
                ) : (
                  <ul className={styles.list}>
                    {book?.subjects
                      // Filter subjects that are technical or not relevant
                      ?.filter((subject) => !subject.includes("="))
                      .filter((subject) => !subject.includes(":"))
                      .map((subject, index) => (
                        <ColoredListItem key={index}>{subject}</ColoredListItem>
                      ))}
                  </ul>
                )}
              </section>
            )}

            {book?.links && book.links.length > 0 && (
              <section>
                <h4 className={styles.sectionTitle}>Links</h4>

                {isLoading ? (
                  <Loader />
                ) : (
                  <ul className={styles.list}>
                    {book?.links?.map((link, index) => (
                      <ColoredListItem key={index}>
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {link.title}
                        </a>
                      </ColoredListItem>
                    ))}
                  </ul>
                )}
              </section>
            )}
          </>
        )}
      </section>
    </main>
  );
}

export default BookPage;
