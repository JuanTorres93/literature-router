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
          <NavLink to="/books/read">📙 read</NavLink>
        </li>
        <li>
          <NavLink to="/books/wished">🧡 wished</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
