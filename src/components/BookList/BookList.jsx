import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import styles from "./BookList.module.scss";
import BookSummary from "../BookSummary/BookSummary";

function BookList({ state, dispatch }) {
  const { searchResults } = state;

  const [booksIds, setBooksIds] = useState([]);

  const [searchParams, setSearchParams] = useSearchParams();

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
          <BookSummary state={state} bookId={bookId} dispatch={dispatch} />
        </li>
      ))}
    </ul>
  );
}

export default BookList;
