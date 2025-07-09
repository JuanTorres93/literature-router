import { NavLink } from "react-router-dom";
import styles from "./NavBar.module.scss";

function NavBar() {
  return (
    <nav className={styles.navbar}>
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/fav/books">🧡 books</NavLink>
        </li>
        <li>
          <NavLink to="/fav/authors">🧡 authors</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
