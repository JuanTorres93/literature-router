import styles from "./ListPage.module.scss";

import NavBar from "../components/NavBar/NavBar";

function ListPage({ children }) {
  return (
    <main className={styles.listPage}>
      <NavBar />
      {children}
    </main>
  );
}

export default ListPage;
