import SearchBar from "./Searchbar";
import TopContent from "./TopContent";
import SearchResults from "./SearchResults";
import {useState} from "react"
import { useLocation } from "react-router-dom";

function SearchPage() {
  const { state } = useLocation();
  const results = state.results;
  console.log(results);
  return (
    <>
      <TopContent />
      <div>
        <SearchBar />
      </div>
      {results.length > 0 ? results.length + " results found" : "No results found, please try something broader"}
      {results.length > 0 ? results.map((i) => (
        <SearchResults result={i} />
      )): null}

    </>
  );
}

export default SearchPage;
