import { useParams } from "react-router-dom";
import NavBar from "../components/NavBar";
import styles from "./AuthorPage.module.scss";
import AuthorDetails from "../components/AuthorDetails";

function AuthorPage() {
  const { authorId } = useParams();

  return (
    <main className={styles.authorPage}>
      <NavBar />
      {/* TODO change to actual image and corresponsing alt */}
      <img src={null} alt="Author image" />
      <AuthorDetails />
    </main>
  );
}

export default AuthorPage;
