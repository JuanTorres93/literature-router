import { useState } from "react";
import { useSearchParams } from "react-router-dom";

import styles from "./HomePage.module.scss";
import NavBar from "../components/NavBar/NavBar";
import SearchBar from "../components/SearchBar/SearchBar";
import RandomQuestion from "../components/RandomQuestion/RandomQuestion";
import BookList from "../components/BookList/BookList";
import Loader from "../components/Loader/Loader";
import PlainMessage from "../components/PlainMessage/PlainMessage";

function HomePage({ state, dispatch }) {
  const hasResults = state.searchResults.length > 0;
  const isLoading = state.fetchingSearchResults;

  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get("sortBy") || "";

  return (
    <main className={styles.homePage}>
      <NavBar />
      <section className={styles.searchSection}>
        <RandomQuestion />
        <SearchBar searchTerm={state.searchQuery} dispatch={dispatch} />
        <select
          value={sortBy}
          onChange={(e) => setSearchParams({ sortBy: e.target.value })}
        >
          <option value="">Sort by</option>
          <option value="title">Title</option>
          {/* Add more sorting options here if needed */}
        </select>
      </section>

      <section className={styles.listSection}>
        {isLoading && <Loader />}
        {!isLoading && hasResults && (
          <BookList state={state} dispatch={dispatch} />
        )}
        {!hasResults && !isLoading && (
          <PlainMessage>
            {state.searchQuery
              ? "No results found. Please try a different search 🔎"
              : "Start by searching for a book! 📚"}
          </PlainMessage>
        )}
      </section>
    </main>
  );
}

export default HomePage;
