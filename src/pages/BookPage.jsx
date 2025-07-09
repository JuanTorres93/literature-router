import styles from "./BookPage.module.scss";

import NavBar from "../components/NavBar";

function BookPage() {
  return (
    <main className={styles.bookPage}>
      <NavBar />
      BOOK PAGE
    </main>
  );
}

export default BookPage;
