import { useParams } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { useBookCover } from "../../hooks/useBookCover";
import styles from "./BookCard.module.scss";
import Heart from "../SVG/Heart";
import BookSVG from "../SVG/BookSVG";
import Loader from "../Loader/Loader";
import ColoredListItem from "../ColoredListItem/ColoredListItem";
import URLImg from "../URLImg/URLImg";

function BookCard({ bookId, coverId, dispatch }) {
  const navigate = useNavigate();
  const { type } = useParams();

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

  const handleRemoveWishedBook = (e) => {
    e.stopPropagation();

    dispatch({
      type: "removeWishedBook",
      payload: { bookId: bookId },
    });
  };

  const handleRemoveReadBook = (e) => {
    e.stopPropagation();

    dispatch({
      type: "removeReadBook",
      payload: { bookId: bookId },
    });
  };

  return (
    <div
      className={styles.bookCard}
      onClick={() => navigate(`/book/${bookId}`)}
    >
      <URLImg
        imgURL={coverURL}
        altText={book?.title + " cover image"}
        loaderElement={<Loader />}
      />

      <div className={styles.header}>
        <span>{book?.title || "Loading title..."}</span>
        {type === "wished" && (
          <Heart onClick={handleRemoveWishedBook} isFull={true} />
        )}

        {type === "read" && (
          <BookSVG onClick={handleRemoveReadBook} isFull={true} />
        )}
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

export default BookCard;
