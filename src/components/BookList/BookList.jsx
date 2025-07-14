import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import styles from "./BookList.module.scss";
import BookSummary from "../BookSummary/BookSummary";
import { useBooks } from "../../contexts/BooksContext";

function BookList() {
  const { state } = useBooks();
  const { searchResults } = state;

  const [booksIds, setBooksIds] = useState([]);

  const [searchParams] = useSearchParams();

  const sortBy = searchParams.get("sortBy") || "";

  useEffect(() => {
    if (!sortBy) {
      setBooksIds(searchResults.map((book) => book.id));
      return;
    }

    if (sortBy === "title") {
      const sortedBooks = [...searchResults].sort((a, b) =>
        a.title.localeCompare(b.title)
      );
      setBooksIds(sortedBooks.map((book) => book.id));
    }
  }, [searchResults, sortBy]);

  return (
    <ul className={styles.bookList}>
      {booksIds.map((bookId) => (
        <li key={bookId}>
          <BookSummary bookId={bookId} />
        </li>
      ))}
    </ul>
  );
}

export default BookList;
