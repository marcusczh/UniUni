import styles from "./Global.module.css";
import { Link } from "react-router-dom";

function navBar() {
  return (
    <>
      <nav className={styles.navBar}>
        <ul className={styles.list}>
          <li className={styles.list}>
            <Link to="/Interviews">Interviews</Link>
          </li>
          <li className={styles.list}>
            <Link to="/Guides">Guides</Link>
          </li>
          <li className={styles.list}>
            <Link to="/Articles">Articles</Link>
          </li>
          <li className={styles.list}>
            <Link to="/Forum">Forum</Link>
          </li>
          <li className={styles.list}>Q&A</li>
          <li className={styles.list}>Coordinator</li>
        </ul>
      </nav>
    </>
  );
}

export default navBar;
