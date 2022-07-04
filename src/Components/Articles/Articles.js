import SearchBar from "../Global/Searchbar";
import stylesArticle from "./Articles.module.css";
import RecommendedArticle from "./RecommendedArticle";
import OtherArticles from "./OtherArticles";
import { Link } from "react-router-dom";
import React from "react";
import axios from "axios";
import TopContent from "../Global/TopContent";
import { selectUser } from "../../features/userSlice";
import { useSelector } from "react-redux";
import List from "./List";

function Articles() {
  const [articles, setArticles] = React.useState(null);
  const [viewAll, setViewAll] = React.useState(4);
  const user = useSelector(selectUser);

  React.useEffect(() => {
    axios.get(`/information?type=Article`).then((res) => {
      setArticles(res.data);
    });
  }, []);

  const viewMore = () => {
    setViewAll(articles.length);
  };

  if (!articles) return null;

  return (
    <>
      <TopContent />
      <div>
        <SearchBar />
        {user ? (
          <Link to={`/Articles/Create`}>
            <button className={stylesArticle.button}>Create Article</button>
          </Link>
        ) : (
          <button className={stylesArticle.button}>Create Article</button>
        )}
        <button className={stylesArticle.button} onClick={viewMore}>
          View more posts
        </button>
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
      <div className="postContainer">
        {articles
          .slice(4, Math.min(viewAll, articles.length))
          .sort((a, b) => b.views - a.views)
          .map((article) => (
            <List post={article} />
          ))}
      </div>
    </>
  );
}

export default Articles;
