import axios from "axios";
import { useState } from "react";
import styles from "./Global.module.css";

function SearchBar() {
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);
  const OPTIONS = ["Interview", "Guide", "Article", "Forum"];
  const [types, setTypes] = useState({
    checkboxes: OPTIONS.reduce(
      (options, option) => ({
        ...options,
        [option]: false,
      }),
      {}
    ),
  });

  const handleSearch = (e) => {
    e.preventDefault();
    let categories = [];
    OPTIONS.map((i) => {
      categories = types.checkboxes[i] ? [...categories, i] : categories;
    });
    axios
      .get(
        `http://localhost:4000/api/search?title=${input}&types=${categories}`
      )
      .then((res) => {
        setResults(res.data);
        console.log(results);
      });
  };

  const handleCheckboxChange = (e) => {
    const { name } = e.target;
    setTypes((prevTypes) => ({
      checkboxes: {
        ...prevTypes.checkboxes,
        [name]: !prevTypes.checkboxes[name],
      },
    }));
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
            <input
              type="checkbox"
              name="Interview"
              onChange={(e) => handleCheckboxChange(e)}
            ></input>
            Interviews
          </label>
          <label className={styles.filters}>
            <input
              type="checkbox"
              name="Guide"
              onChange={handleCheckboxChange}
            ></input>
            Guides
          </label>
          <label className={styles.filters}>
            <input
              type="checkbox"
              name="Article"
              onChange={handleCheckboxChange}
            ></input>
            Articles
          </label>
          <label className={styles.filters}>
            <input
              type="checkbox"
              name="Forum"
              onChange={handleCheckboxChange}
            ></input>
            Forums
          </label>
        </div>
      </div>
    </>
  );
}

export default SearchBar;
