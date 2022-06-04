import NavBar from "../Global/Navbar";
import LogOut from "../Global/Logout";
import SearchBar from "../Global/Searchbar";
import styles from "../HomePage/HomePage.module.css";
import Logo from "../Global/Logo";
import stylesArticle from "./Articles.module.css";
import RecommendedArticle from "./RecommendedArticle";
import OtherArticles from "./OtherArticles";
import { Link } from "react-router-dom";
import { useState } from "react";

function articles() {
  const [articles, updateArticles] = useState(
    axios
      .get("http://localhost:4000/api/information", {
        params: {
          type: "Article",
          title: "*",
          date: "*",
          tags: "*",
          body: "*",
        },
      })
      .then((res) => {
        return res.data;
      })
  );

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
        <RecommendedArticle article={article[0] || null} />
      </Link>
      <div className={stylesArticle.otherArticles}>
        <div>
          <OtherArticles article={article[1] || null} />
        </div>
        <div>
          <OtherArticles article={article[2] || null} />
        </div>
        <div>
          <OtherArticles article={article[3] || null} />
        </div>
      </div>
    </>
  );
}

export default articles;
