import NavBar from "../Global/Navbar";
import LogOut from "../Global/Logout";
import SearchBar from "../Global/Searchbar";
import styles from "../HomePage/HomePage.module.css";
import Logo from "../Global/Logo";
//import stylesForum from "./Forums.module.css";
//import RecommendedForum from "./RecommendedForum";
//import OtherForums from "./OtherForums";
import { Link } from "react-router-dom";
import Posts from "./Posts";
import PostActions from "./PostActions";

function forum() {
  return (
    <>
      <div className={styles.topContent}>
        <Logo />
        <NavBar />
        <LogOut />
      </div>
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
