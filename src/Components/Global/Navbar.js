import styles from "./Global.module.css";

function navBar() {
  return (
    <>
      <nav className={styles.navBar}>
        <ul className={styles.list}>
          <li className={styles.list}>Interviews</li>
          <li className={styles.list}>Guides</li>
          <li className={styles.list}>Articles</li>
          <li className={styles.list}>Forum</li>
          <li className={styles.list}>Q&A</li>
          <li className={styles.list}>Coordinator</li>
        </ul>
      </nav>
    </>
  );
}

export default navBar;
