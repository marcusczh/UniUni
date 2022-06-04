import NavBar from "../Global/Navbar";
import LogOut from "../Global/Logout";
import SearchBar from "../Global/Searchbar";
import styles from "../HomePage/HomePage.module.css";
import Logo from "../Global/Logo";
import stylesArticle from "./Articles.module.css";
import RecommendedArticle from "./RecommendedArticle";
import OtherArticles from "./OtherArticles";
import { Link } from "react-router-dom";

function articles() {
  return (
    <>
      <div className={styles.topContent}>
        <Logo />
        <NavBar />
        <LogOut />
      </div>
      <div>
        <SearchBar />
      </div>
      <Link to="./TestArticle" className={stylesArticle.recommendedArticle}>
        <RecommendedArticle />
      </Link>
      <div className={stylesArticle.otherArticles}>
          <div><OtherArticles /></div>
          <div><OtherArticles /></div>
          <div><OtherArticles /></div>
      </div>
    </>
  );
}

export default articles;
