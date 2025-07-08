import styles from "./HomePage.module.css";
import NavBar from "../components/NavBar";
import SearchBar from "../components/SearchBar";
import RandomQuestion from "../components/RandomQuestion";

function HomePage() {
  return (
    <main className={styles.homePage}>
      <NavBar />
      <section className={styles.searchSection}>
        <RandomQuestion />
        <SearchBar />
      </section>

      <section>Books list</section>
    </main>
  );
}

export default HomePage;
