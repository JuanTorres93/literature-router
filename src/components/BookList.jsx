import styles from "./BookList.module.scss";
import BookSummary from "./BookSummary";

function BookList({ state }) {
  const { searchResults } = state;
  const booksId = searchResults.map((book) => book.id);

  return (
    <ul className={styles.bookList}>
      {booksId.map((bookId) => (
        <li key={bookId}>
          <BookSummary bookId={bookId} />
        </li>
      ))}
    </ul>
  );
}

export default BookList;
