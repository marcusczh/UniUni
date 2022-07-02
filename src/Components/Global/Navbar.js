import styles from "./Global.module.css";
import { Link } from "react-router-dom";

function navBar() {
  return (
    <>
      <nav className={styles.navBar}>
        <ul className={styles.list}>
          <li className={styles.listItem}>
            <Link to="/Interviews">Interviews</Link>
          </li>
          <li className={styles.listItem}>
            <Link to="/Guides">Guides</Link>
          </li>
          <li className={styles.listItem}>
            <Link to="/Articles">Articles</Link>
          </li>
          <li className={styles.listItem}>
            <Link to="/Forum">Forum</Link>
          </li>
          <li className={styles.listItem}>Q&A</li>
          <li className={styles.listItem}>Coordinator</li>
        </ul>
      </nav>
    </>
  );
}

export default navBar;
