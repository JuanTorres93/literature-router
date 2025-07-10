import { useFetch } from "../hooks/useFetch";
import { useBookCover } from "../hooks/useBookCover";
import styles from "./BookCard.module.scss";
import Heart from "./Heart";

function BookCard({ bookId, coverId, onClick }) {
  const { results: book } = useFetch(
    `https://openlibrary.org/works/${bookId}.json`,
    null
  );

  const { coverURL } = useBookCover(coverId);

  const rawExcerpts = book?.excerpts
    ? book.excerpts.map((obj) => obj.excerpt)
    : [];

  // at most 3 excerpts
  const reducedExcerpts = rawExcerpts.slice(0, 3);

  // 20 words per excerpt
  const excerpts = reducedExcerpts.map((excerpt) => {
    const words = excerpt.split(" ");
    return words.length > 20 ? words.slice(0, 20).join(" ") + "..." : excerpt;
  });

  return (
    <div className={styles.bookCard} onClick={onClick}>
      <img
        src={coverId ? coverURL : "no-image.png"}
        alt={`${book?.title} cover image`}
      />

      <div className={styles.header}>
        <span>{book?.title || "Unknown title"}</span>
        {/* TODO handle remove fav */}
        <Heart isFull={true} />
      </div>

      <BookCardContent
        excerpts={excerpts?.length > 0 ? excerpts : ["No excerpts available"]}
      />
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

// NOTE currently not used. I was implementing a feature that I
// hadn't planned for this project. I'm keeping the code in casse I
// need it in the future.
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

export default BookCard;
