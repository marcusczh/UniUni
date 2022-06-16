import axios from "axios";
import { useState } from "react";
import styles from "./Global.module.css";

function SearchBar() {
  const [input, setInput] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    // axios.get().then((res) => {});
  };

  return (
    <>
      <div className={styles.searchBar}>
        <div>
          <label className={styles.searchLabel}>Search:</label>
          <input
            type="text"
            placeholder="Search for something ..."
            className={styles.searchInput}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          ></input>
          <button className={styles.searchButton} onClick={handleSearch}>
            Search
          </button>
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

export default SearchBar;
