import SearchBar from "../Global/Searchbar";
import stylesArticle from "./Articles.module.css";
import RecommendedArticle from "./RecommendedArticle";
import OtherArticles from "./OtherArticles";
import { Link } from "react-router-dom";
import React from "react";
import axios from "axios";
import TopContent from "../Global/TopContent";

function Articles() {
  const [articles, setArticles] = React.useState(null);
  React.useEffect(() => {
    axios
      .get(`http://localhost:4000/api/information?type=Article`)
      .then((res) => {
        setArticles(res.data);
      });
  }, []);

  if (!articles) return null;

  return (
    <>
      <TopContent />
      <div>
        <SearchBar />
      </div>
      <Link
        to={`/Articles/${articles[0].title}`}
        className={stylesArticle.recommendedArticle}
      >
        <RecommendedArticle article={articles[0]} />
      </Link>
      <div className={stylesArticle.otherArticles}>
        <div>
          <Link
            to={`/Articles/${articles[1].title}`}
            className={stylesArticle.otherArticles}
          >
            <OtherArticles article={articles[1] || null} />
          </Link>
        </div>

        <div>
          <Link
            to={`/Articles/${articles[2].title}`}
            className={stylesArticle.otherArticles}
          >
            <OtherArticles article={articles[2] || null} />
          </Link>
        </div>
        <div>
          <Link
            to={`/Articles/${articles[3].title}`}
            className={stylesArticle.otherArticles}
          >
            <OtherArticles article={articles[3] || null} />
          </Link>
        </div>
      </div>
    </>
  );
}

export default Articles;
