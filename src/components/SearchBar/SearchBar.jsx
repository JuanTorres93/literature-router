import { useEffect, useRef } from "react";

import styles from "./SearchBar.module.scss";
import { useKeydown } from "../../hooks/useKeydown";
import { useBooks } from "../../contexts/BooksContext";

function SearchBar() {
  const { state, dispatch } = useBooks();
  const searchTerm = state.searchQuery;

  const inputRef = useRef(null);

  useEffect(() => {
    // Focus on mount
    inputRef.current.focus();
  }, []);

  useKeydown("Enter", () => {
    // Focus on pressing Enter key

    // Check if the input is focused
    if (document.activeElement !== inputRef.current) {
      // If not focused, focus the input
      inputRef.current.focus();

      // Clear the current search term
      dispatch({
        type: "setSearchQuery",
        payload: "",
      });
    }
  });

  return (
    <input
      className={styles.searchBar}
      type="text"
      placeholder="Look for something interesting!"
      value={searchTerm}
      onChange={(e) =>
        dispatch({
          type: "setSearchQuery",
          payload: e.target.value,
        })
      }
      ref={inputRef}
    />
  );
}

export default SearchBar;
