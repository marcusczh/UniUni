import axios from "axios";
import { useEffect, useState } from "react";
import styles from "./Global.module.css";
import { useNavigate } from "react-router-dom";
import SearchResults from "./SearchResults";

function SearchBar() {
  /**
   * input - of type String: Keeps track of input into search bar
   * results - of type Array: Keeps track of results returned by handleSearch
   * types - of type Array: Stores checked boxes/filters
   *
   */
  let navigate = useNavigate();
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
  const [forumResults, setForumResults] = useState([]);
  const [infoResults, setInfoResults] = useState([]);

  useEffect(() => {
    handleSearch();
    handleForumSearch();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSearch = async () => {
    let categories = [];
    OPTIONS.map((i) => {
      categories = types.checkboxes[i] ? [...categories, i] : categories;
    });
    //console.log(categories);
    //Queries articles/guides/interviews with the search input
    await axios
      .get(
        `http://localhost:4000/api/search?title=${input}&types=${categories}`
      )
      .then((res) => {
        setInfoResults(res.data);
      });
  };

  // If forum is selected: queries, concatenates forum with existing results and
  // sorts the results as a whole
  const handleForumSearch = async () => {
    axios
      .get(`http://localhost:4000/api/searchForum?title=${input}`)
      .then((res) => {
        setForumResults(res.data);
      });
  };

  //Manages checkbox tracking in state "types"
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
          <button
            className={styles.searchButton}
            onClick={(e) => {
              e.preventDefault();
              handleSearch();
              handleForumSearch();
              types.checkboxes["Forum"]
                ? setResults([...forumResults, ...infoResults])
                : setResults(infoResults);
              navigate(`/SearchResults/`, { replace: true });
            }}
          >
            Search
          </button>
          <br></br>
          <label className={styles.searchLabel}>Filters:</label>
          <label className={styles.filters}>
            <input
              type="checkbox"
              name="Interview"
              onChange={handleCheckboxChange}
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
          <button
            className={styles.searchButton}
            onClick={(e) => {
              e.preventDefault();
              navigate(`/Tags`, { replace: true });
            }}
          >
            Tags
          </button>
        </div>
      </div>
      {results.length ? results.length + " results found" : null}
      {results.map((i) => (
        <SearchResults result={i} />
      ))}
    </>
  );
}

export default SearchBar;
