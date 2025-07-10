import styles from "./HomePage.module.scss";
import NavBar from "../components/NavBar";
import SearchBar from "../components/SearchBar";
import RandomQuestion from "../components/RandomQuestion";
import BookList from "../components/BookList";
import Loader from "../components/Loader";
import PlainMessage from "../components/PlainMessage";

function HomePage({ state, dispatch }) {
  const hasResults = state.searchResults.length > 0;
  const isLoading = state.fetchingSearchResults;

  return (
    <main className={styles.homePage}>
      <NavBar />
      <section className={styles.searchSection}>
        <RandomQuestion />
        <SearchBar searchTerm={state.searchQuery} dispatch={dispatch} />
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
