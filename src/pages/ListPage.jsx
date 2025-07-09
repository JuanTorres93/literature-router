import { useParams, useNavigate } from "react-router-dom";
import styles from "./ListPage.module.scss";

import NavBar from "../components/NavBar";
import BookCard, { BookCardContent } from "../components/BookCard";

function ListPage() {
  const navigate = useNavigate();
  const { type } = useParams();

  // TODO use type to select one list or another

  return (
    <main className={styles.listPage}>
      <NavBar />

      <>
        {/* TODO map over list elements and remove this placeholcer BookCards */}
        {/* TODO do not forget to add onClick handler when including real data */}
        <BookCard onClick={() => navigate("/book/1")} cardTitle={"Card 1"}>
          Card content
        </BookCard>
        <BookCard cardTitle={"Regular card"}>
          Card with a lot of content that is going to be very long and will take
          up a lot of space, so we can see how it looks like when it is long
        </BookCard>
        <BookCard
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
        </BookCard>
      </>
    </main>
  );
}

export default ListPage;
