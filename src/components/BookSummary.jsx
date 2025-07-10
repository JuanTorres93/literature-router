import { useFetch } from "../hooks/useFetch";
import { useBookCover } from "../hooks/useBookCover";

import { API_BASE_URL } from "../config";
import styles from "./BookSummary.module.scss";
import Heart from "./Heart";
import Loader from "./Loader";

const MAX_WORDS_IN_SUMMARY = 40;

function BookSummary({ bookId, state, dispatch }) {
  const { results: book, isLoading } = useFetch(
    `${API_BASE_URL}/works/${bookId}.json`,
    null
  );
  const coverId = book?.covers?.[0] || book?.cover_id || book?.cover_i;
  const { coverURL } = useBookCover(coverId);
  const isWished = state.wishedBooks.some(
    (wishedBook) => wishedBook.bookId === bookId
  );

  const description = book?.description?.value || book?.description || "";
  const words = description.split(" ");
  const summary =
    words.length > MAX_WORDS_IN_SUMMARY
      ? words.slice(0, MAX_WORDS_IN_SUMMARY).join(" ") + "..."
      : description;

  return (
    <div className={styles.bookSummary}>
      {isLoading && <Loader />}
      {!isLoading && (
        <>
          <img
            src={coverId ? coverURL : "no-image.png"}
            alt={`${book?.title} cover image`}
          />
          <h3 className={styles.title}>{book?.title}</h3>
          <p>{summary}</p>
          <span className={styles.favIcon}>
            <Heart
              isFull={isWished}
              onClick={() =>
                dispatch({
                  type: "addWishedBook",
                  payload: {
                    bookId: bookId,
                    coverId: coverId,
                  },
                })
              }
            />
          </span>
        </>
      )}
    </div>
  );
}

export default BookSummary;
