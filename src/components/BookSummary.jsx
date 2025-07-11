import { useNavigate } from "react-router-dom";

import { useBook } from "../hooks/useBook";
import { useBookCover } from "../hooks/useBookCover";
import { extractCoverId } from "../utils/bookProcess";

import styles from "./BookSummary.module.scss";
import Heart from "./Heart";
import Loader from "./Loader";

const MAX_WORDS_IN_SUMMARY = 40;

function BookSummary({ bookId, state, dispatch }) {
  const navigate = useNavigate();
  const { book, isLoading } = useBook(bookId);

  const coverId = extractCoverId(book);
  const { coverURL, isCoverLoading, setIsCoverLoading } = useBookCover(coverId);

  const isWished = state.wishedBooks.some(
    (wishedBook) => wishedBook.bookId === bookId
  );

  const description = book?.description?.value || book?.description || "";
  const words = description.split(" ");
  const summary =
    words.length > MAX_WORDS_IN_SUMMARY
      ? words.slice(0, MAX_WORDS_IN_SUMMARY).join(" ") + "..."
      : description;

  const handleWish = (e) => {
    e.stopPropagation();

    isWished
      ? dispatch({
          type: "removeWishedBook",
          payload: { bookId: bookId },
        })
      : dispatch({
          type: "addWishedBook",
          payload: {
            bookId: bookId,
            coverId: coverId,
          },
        });
  };

  return (
    <div
      className={styles.bookSummary}
      onClick={() => navigate(`/book/${bookId}`)}
    >
      {isLoading && <Loader />}
      {!isLoading && (
        <>
          {isCoverLoading && <Loader />}

          <img
            src={coverId ? coverURL : "no-image.png"}
            alt={isCoverLoading ? "" : `${book?.title} cover image`}
            onLoad={() => setIsCoverLoading(false)}
          />

          <h3 className={styles.title}>{book?.title}</h3>
          <p>{summary}</p>
          <span className={styles.favIcon}>
            <Heart isFull={isWished} onClick={handleWish} />
          </span>
        </>
      )}
    </div>
  );
}

export default BookSummary;
