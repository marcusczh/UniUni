import SearchBar from "./Searchbar";
import TopContent from "./TopContent";
import SearchResults from "./SearchResults";
import { useLocation } from "react-router-dom";

function SearchPage() {
  const { state } = useLocation();
  const results = state.results;
  return (
    <>
      <TopContent />
      <div>
        <SearchBar />
      </div>
      {results.length ? results.length + " results found" : null}
      {results.map((i) => (
        <SearchResults result={i} />
      ))}
    </>
  );
}

export default SearchPage;
