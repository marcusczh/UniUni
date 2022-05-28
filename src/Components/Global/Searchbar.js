import styles from "./Global.module.css";

function searchBar() {
  return (
    <>
      <div className={styles.searchBar}>
        <div>
          <label className={styles.searchLabel}>Search:</label>
          <input
            type="text"
            placeholder=""
            className={styles.searchInput}
          ></input>
          <button className={styles.searchButton}>Search</button>
          <br></br>
          <label className={styles.searchLabel}>Filters:</label>
          <label className={styles.filters}>
            <input type="checkbox"></input>Interviews
          </label>
          <label className={styles.filters}>
            <input type="checkbox"></input>Guides
          </label>
          <label className={styles.filters}>
            <input type="checkbox"></input>Articles
          </label>
          <label className={styles.filters}>
            <input type="checkbox"></input>Forums
          </label>
        </div>
      </div>
    </>
  );
}

export default searchBar;
