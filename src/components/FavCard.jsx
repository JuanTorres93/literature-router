import styles from "./FavCard.module.scss";
import Heart from "./Heart";

function FavCard({ cardTitle, children, onClick }) {
  return (
    <div className={styles.favCard} onClick={onClick}>
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

export function BookCardContent({ excerpts }) {
  return (
    <>
      <h3 className={styles.sectionName}>Excerpts</h3>
      <ul className={styles.cardList}>
        {excerpts.map((excerpt, index) => (
          <ColoredListItem key={`${index}${excerpt}`}>
            {excerpt}
          </ColoredListItem>
        ))}
      </ul>
    </>
  );
}

export function AuthorCardContent({ alternateNames, links }) {
  return (
    <>
      <h3 className={styles.sectionName}>Alternate names</h3>

      <ul className={styles.cardList}>
        {alternateNames.map((name, index) => (
          <ColoredListItem key={`${index}${name}`}>{name}</ColoredListItem>
        ))}
      </ul>

      <h3 className={styles.sectionName}>Links</h3>

      <ul className={styles.cardList}>
        {links.map((link, index) => (
          <ColoredListItem key={`${index}${link}`}>
            <a href={link} target="_blank" rel="noopener noreferrer">
              {link}
            </a>
          </ColoredListItem>
        ))}
      </ul>
    </>
  );
}

function ColoredListItem({ children }) {
  // Random number between 1 and 9 both included
  // this will map different colors to the list items according
  // sass file with classes cardItem____color1 to cardItem____color9
  const randomNumber = Math.floor(Math.random() * 9) + 1;

  return (
    <li
      className={`${styles.cardItem} ${
        styles[`cardItem____color${randomNumber}`]
      }`}
    >
      {children}
    </li>
  );
}

export default FavCard;
