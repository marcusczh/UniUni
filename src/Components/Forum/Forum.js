import SearchBar from "../Global/Searchbar";
import Posts from "./Posts";
import PostActions from "./PostActions";
import TopContent from "../Global/TopContent";

function forum() {
  return (
    <>
      <TopContent />
      <div>
        <SearchBar />
        <PostActions />
      </div>
      <Posts />
      <Posts />
      <Posts />
      <Posts />
    </>
  );
}

export default forum;
