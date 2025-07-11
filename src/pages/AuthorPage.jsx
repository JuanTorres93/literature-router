import { useParams } from "react-router-dom";

import { useAuthor } from "../hooks/useAuthor";
import { useAuthorPhoto } from "../hooks/useAuthorPhoto";
import { extractPhotoId } from "../utils/authorProcess";
import NavBar from "../components/NavBar/NavBar";
import styles from "./AuthorPage.module.scss";
import URLImg from "../components/URLImg/URLImg";
import Loader from "../components/Loader/Loader";

function AuthorPage() {
  const { authorId } = useParams();
  const { author } = useAuthor(authorId);
  const { photoURL } = useAuthorPhoto(extractPhotoId(author), "L");

  // TODO DELETE THESE DEBUG LOGS
  // console.log("author");
  // console.log(author);

  return (
    <main className={styles.authorPage}>
      <NavBar />

      <section>
        <URLImg
          imgURL={photoURL}
          altText={`${author?.name} photo`}
          loaderElement={<Loader type="loader-square" />}
        />
      </section>

      <section className={styles.infoSection}>
        <h3 className={styles.authorName}>{author?.name}</h3>

        {/* 
        <section>
          <h4 className={styles.sectionTitle}>Description</h4>
          <p>{book?.description || "No description available."}</p>
        </section>
          */}
        {/* 

        {book?.subjects && book.subjects.length > 0 && (
          <section>
            <h4 className={styles.sectionTitle}>Subjects</h4>
            <ul className={styles.list}>
              {book?.subjects
                // Filter subjects that are technical or not relevant
                ?.filter((subject) => !subject.includes("="))
                .filter((subject) => !subject.includes(":"))
                .map((subject, index) => (
                  <ColoredListItem key={index}>{subject}</ColoredListItem>
                ))}
            </ul>
          </section>
        )}
        */}

        {/* 
        {book?.links && book.links.length > 0 && (
          <section>
            <h4 className={styles.sectionTitle}>Links</h4>
            <ul className={styles.list}>
              {book?.links?.map((link, index) => (
                <ColoredListItem key={index}>
                  <a href={link.url} target="_blank" rel="noopener noreferrer">
                    {link.title}
                  </a>
                </ColoredListItem>
              ))}
            </ul>
          </section>
        )}
        */}
      </section>
    </main>
  );
}

export default AuthorPage;
