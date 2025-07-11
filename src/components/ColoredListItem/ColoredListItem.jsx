import styles from "./ColoredListItem.module.scss";

function ColoredListItem({ children }) {
  // Random number between 1 and 9 both included
  // this will map different colors to the list items according
  // sass file with classes cardItem____color1 to cardItem____color9
  const randomNumber = Math.floor(Math.random() * 9) + 1;

  return (
    <li
      className={`${styles.coloredListItem} ${
        styles[`coloredListItem____color${randomNumber}`]
      }`}
    >
      {children}
    </li>
  );
}

export default ColoredListItem;
