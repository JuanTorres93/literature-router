import { NavLink } from "react-router-dom";
import styles from "./NavBar.module.css";

function NavBar() {
  return (
    <nav className={styles.navbar}>
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/fav-books">Fav books</NavLink>
        </li>
        <li>
          <NavLink to="/fav-authors">Fav authors</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
