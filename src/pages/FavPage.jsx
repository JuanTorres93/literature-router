import styles from "./FavPage.module.scss";

import NavBar from "../components/NavBar";
import FavCard from "../components/FavCard";

function FavPage() {
  return (
    <main className={styles.favPage}>
      <NavBar />
      {/* TODO map over fav elements and remove this placeholcer FavCards */}
      <FavCard cardTitle={"Card 1"}>Card content</FavCard>
      <FavCard cardTitle={"Regular card"}>
        Card with a lot of content that is going to be very long and will take
        up a lot of space, so we can see how it looks like when it is long
      </FavCard>
      <FavCard
        cardTitle={
          "Incredible card with a really long title that spans several lines"
        }
      >
        Card Amazing content{" "}
      </FavCard>
    </main>
  );
}

export default FavPage;
