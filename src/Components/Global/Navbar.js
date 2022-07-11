import styles from "./Global.module.css";
import { Link } from "react-router-dom";

function navBar() {
  return (
    <>
      <nav className={styles.navBar}>
        <ul className={styles.list}>
          <li className={styles.listItem}>
            <Link to="/Interviews" className={styles.navBarLink}>
              Interviews
            </Link>
          </li>
          <li className={styles.listItem}>
            <Link to="/Guides" className={styles.navBarLink}>
              Guides
            </Link>
          </li>
          <li className={styles.listItem}>
            <Link to="/Articles" className={styles.navBarLink}>
              Articles
            </Link>
          </li>
          <li className={styles.listItem}>
            <Link to="/Forum" className={styles.navBarLink}>
              Forum
            </Link>
          </li>
          <li className={styles.listItem}>
            <Link to="/Coordinator" className={styles.navBarLink}>
              Coordinator
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default navBar;
