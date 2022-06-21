import axios from "axios";
import { useState, useEffect } from "react";
import styles from "./Global.module.css";
import { useNavigate } from "react-router-dom";
import AddingTags from "./AddingTags";

function SearchBar() {

  const [tags, setTags] = useState([]);
  console.log(tags);
  /**
   * input - of type String: Keeps track of input into search bar
   * results - of type Array: Keeps track of results returned by handleSearch
   * types - of type Array: Stores checked boxes/filters
   *
   */
  let navigate = useNavigate();
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);
  const [toggleSearch, setToggleSearch] = useState(false);

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

  useEffect(() => {
    setToggleSearch(false);
    handleSearch()}
  , [])


  async function handleSearch() {
    let categories = [];
    OPTIONS.map((i) => {
      categories = types.checkboxes[i] ? [...categories, i] : categories;
    });
    //console.log(categories);
    //Queries articles/guides/interviews with the search input
    await axios
      .get(
        `http://localhost:4000/api/search?title=${input}&types=${categories}&tags=${tags}`
      )
      .then((res) => {
        console.log(res.data);
        setResults(res.data);
        console.log(results);
        if(toggleSearch){
          navigate(`/SearchResults/`, {
            replace: true,
            state: {
              results: results,
            },
          })
        }
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
        <div className={styles.searchBarSection}>
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
              setToggleSearch(true);
              handleSearch();
            }}
          >
            Search
          </button>
        </div>
        <div className={styles.searchBarSection}>
          <div className={styles.filterContainer}>
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
          </div>
          <div className={styles.tagsContainer}>
            <AddingTags setTags={setTags} tags={tags}/>
          </div>
        </div>
      </div>
    </>
  );
}

export default SearchBar;
