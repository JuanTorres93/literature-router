import { useNavigate } from "react-router-dom";

import { useBook } from "../../hooks/useBook";
import { useBookCover } from "../../hooks/useBookCover";
import { extractCoverId } from "../../utils/bookProcess";

import styles from "./BookSummary.module.scss";
import Heart from "../SVG/Heart";
import BookSVG from "../SVG/BookSVG";
import Loader from "../Loader/Loader";
import URLImg from "../URLImg/URLImg";

const MAX_WORDS_IN_SUMMARY = 40;

function BookSummary({ bookId, state, dispatch }) {
  const navigate = useNavigate();
  const { book, isLoading } = useBook(bookId);

  const coverId = extractCoverId(book);
  const { coverURL } = useBookCover(coverId);

  const isWished = state.wishedBooks.some(
    (wishedBook) => wishedBook.bookId === bookId
  );
  const isRead = state.readBooks.some((readBook) => readBook.bookId === bookId);

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

  const handleRead = (e) => {
    e.stopPropagation();

    isRead
      ? dispatch({
          type: "removeReadBook",
          payload: { bookId: bookId },
        })
      : dispatch({
          type: "addReadBook",
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
          <URLImg
            imgURL={coverURL}
            loaderElement={<Loader />}
            altText={`${book?.title} cover image`}
          />
          {/* 

           */}
          <h3 className={styles.title}>{book?.title}</h3>
          <p>{summary}</p>
          <span className={styles.favIcon}>
            <Heart isFull={isWished} onClick={handleWish} />
          </span>

          {/* TODO NEXT handle read and isRead instead of wish */}
          <span className={styles.readIcon}>
            <BookSVG isFull={isRead} onClick={handleRead} />
          </span>
        </>
      )}
    </div>
  );
}

export default BookSummary;
