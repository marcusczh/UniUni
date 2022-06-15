import SearchBar from "../Global/Searchbar";
import Feed from "./Feed";
import TopContent from "../Global/TopContent";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";

function HomePage() {
  const user = useSelector(selectUser);

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

export default HomePage;
