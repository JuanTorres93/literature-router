import styles from "./FavCard.module.scss";
import Heart from "./Heart";

function FavCard({ cardTitle, children }) {
  return (
    <div className={styles.favCard}>
      {/* TODO include img and custom alt text */}
      <img src={null} alt="Image alt" />
      <div className={styles.header}>
        <span>{cardTitle}</span>
        {/* TODO change true to be data driven */}
        <Heart isFull={true} />
      </div>
      {children}
    </div>
  );
}

export default FavCard;
