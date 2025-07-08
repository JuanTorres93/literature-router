import styles from "./BookList.module.scss";
import BookSummary from "./BookSummary";

function BookList({ booksIds }) {
  return (
    <ul className={styles.bookList}>
      {/* Array of 6 elements */}
      {/* TODO change to books ids when implementing logic */}
      {Array.from({ length: 6 }, (_, index) => (
        <li key={index}>
          <BookSummary />
        </li>
      ))}
    </ul>
  );
}

export default BookList;
