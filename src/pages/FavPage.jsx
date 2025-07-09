import { useParams, useNavigate } from "react-router-dom";
import styles from "./FavPage.module.scss";

import NavBar from "../components/NavBar";
import FavCard, {
  BookCardContent,
  AuthorCardContent,
} from "../components/FavCard";

function FavPage() {
  const navigate = useNavigate();
  const { favtype } = useParams();

  return (
    <main className={styles.favPage}>
      <NavBar />

      {favtype === "books" ? (
        <>
          {/* TODO map over fav elements and remove this placeholcer FavCards */}
          {/* TODO do not forget to add onClick handler when including real data */}
          <FavCard onClick={() => navigate("/book/1")} cardTitle={"Card 1"}>
            Card content
          </FavCard>
          <FavCard cardTitle={"Regular card"}>
            Card with a lot of content that is going to be very long and will
            take up a lot of space, so we can see how it looks like when it is
            long
          </FavCard>
          <FavCard
            cardTitle={
              "Incredible card with a really long title that spans several lines"
            }
          >
            <BookCardContent
              excerpts={[
                "With great power comes great responsibility",
                "The only thing we have to fear is fear itself",
                "The unexamined life is not worth living",
              ]}
            />
          </FavCard>
        </>
      ) : (
        <>
          {/* TODO map over fav elements and remove this placeholcer FavCards */}
          {/* TODO do not forget to add onClick handler when including real data */}
          <FavCard
            onClick={() => navigate("/author/1")}
            cardTitle={"Brandon Sanderson"}
          >
            Card content
          </FavCard>
          <FavCard cardTitle={"Liu Cixin"}>
            <AuthorCardContent
              alternateNames={["Liu Cixin", "Liu Cixin"]}
              links={[
                "https://en.wikipedia.org/wiki/Liu_Cixin",
                "https://www.goodreads.com/author/show/136239.Liu_Cixin",
              ]}
            />
          </FavCard>
        </>
      )}
    </main>
  );
}

export default FavPage;
