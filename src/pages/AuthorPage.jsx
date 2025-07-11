import { useParams } from "react-router-dom";

import { useAuthor } from "../hooks/useAuthor";
import { useAuthorPhoto } from "../hooks/useAuthorPhoto";
import { extractPhotoId } from "../utils/authorProcess";
import NavBar from "../components/NavBar/NavBar";
import styles from "./AuthorPage.module.scss";
import URLImg from "../components/URLImg/URLImg";
import Loader from "../components/Loader/Loader";
import ColoredListItem from "../components/ColoredListItem/ColoredListItem";

function AuthorPage() {
  const { authorId } = useParams();
  const { author, isLoading } = useAuthor(authorId);
  const { photoURL } = useAuthorPhoto(extractPhotoId(author), "L");

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
        {isLoading ? (
          <Loader type="loader-square" />
        ) : (
          <>
            <h3 className={styles.authorName}>
              {author?.name}
              {author?.birth_date && (
                <em>
                  {author.birth_date}
                  {author?.death_date ? " - " + author?.death_date : ""}
                </em>
              )}
            </h3>

            <section>
              <h4 className={styles.sectionTitle}>Bio</h4>
              <p>{author?.bio || "No Bio available."}</p>
            </section>

            {author?.alternate_names && author.alternate_names.length > 0 && (
              <section>
                <h4 className={styles.sectionTitle}>Alternate names</h4>
                <ul className={styles.list}>
                  {author?.alternate_names
                    // Filter subjects that are technical or not relevant
                    ?.filter((name) => !name.includes("="))
                    .filter((name) => !name.includes(":"))
                    .map((name, index) => (
                      <ColoredListItem key={index}>{name}</ColoredListItem>
                    ))}
                </ul>
              </section>
            )}

            {author?.links && author.links.length > 0 && (
              <section>
                <h4 className={styles.sectionTitle}>Links</h4>
                <ul className={styles.list}>
                  {author?.links?.map((link, index) => (
                    <ColoredListItem key={index}>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {link.title}
                      </a>
                    </ColoredListItem>
                  ))}
                </ul>
              </section>
            )}
          </>
        )}
      </section>
    </main>
  );
}

export default AuthorPage;
