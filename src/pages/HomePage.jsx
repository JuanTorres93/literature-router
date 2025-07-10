import styles from "./HomePage.module.scss";
import NavBar from "../components/NavBar";
import SearchBar from "../components/SearchBar";
import RandomQuestion from "../components/RandomQuestion";
import BookList from "../components/BookList";

function HomePage({ state, dispatch }) {
  return (
    <main className={styles.homePage}>
      <NavBar />
      <section className={styles.searchSection}>
        <RandomQuestion />
        <SearchBar dispatch={dispatch} />
      </section>

      <section className={styles.listSection}>
        <BookList state={state} />
      </section>
    </main>
  );
}

export default HomePage;
