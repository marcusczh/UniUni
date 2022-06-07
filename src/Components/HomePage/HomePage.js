import SearchBar from "../Global/Searchbar";
import Feed from "./Feed";
import TopContent from "../Global/TopContent";

function homePage() {
  return (
    <>
      <TopContent />
      <div>
        <SearchBar />
      </div>
      <Feed />
    </>
  );
}

export default homePage;
