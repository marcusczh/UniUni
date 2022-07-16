/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import articleStyles from "./Articles.module.css";
import axios from "axios";
import { useLocation, useParams, Link } from "react-router-dom";
import { React, useState, useEffect, useRef } from "react";
import { selectUser } from "../../features/userSlice";
import { useSelector } from "react-redux";
import SearchBar from "../Global/Searchbar";
import BookmarkButton from "../Global/BookmarkButton";
import TopContent from "../Global/TopContent";
import { format } from "date-fns";

function SpecificArticle() {
  const { title } = useParams();
  // const { location } = useLocation();
  const [article, setArticle] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = useSelector(selectUser);
  const [flag, setFlag] = useState(true);

  // Fetch data only after view count is updated
  useEffect(() => {
    axios
      .get("/api/information", {
        params: {
          type: "Article",
          title: title,
        },
      })
      .then((res) => {
        setArticle(res.data);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, [flag]);

  // Update view count
  useEffect(() => {
    axios
      .post("/api/informationviews", {
        params: {
          type: "Article",
          title: title,
        },
      })
      .then(setFlag(!flag))
      .catch((error) => console.log(error));
  }, []);

  //   useEffect(() => {
  //     const links = document.querySelectorAll(".link-con .navi-link");

  //     links.forEach((link, i) => {
  //       link.addEventListener("click", () => {
  //         const targetId = link.getAttribute("name");
  //         window.scrollTo(
  //           0,
  //           document.querySelector("#" + targetId).getBoundingClientRect().top
  //         );
  //       });
  //     });
  //   }, []);

  /* const references = useRef(
    new Array(article.length === 0 ? 0 : article[0].body.length)
  );
  for (let index = 0; index < references.length; index++) {
    references[index] = React.createRef(null);
  } */

  if (loading) {
    return <div>loading...</div>;
  }

  if (article.length === 0) {
    return (
      <div className={articleStyles.page}>
        <TopContent />
        <div>
          <SearchBar />
        </div>
        <div className={articleStyles.layout}>
          <div>
            <div className={articleStyles.articleTitle}>No articles.</div>
            <div className={articleStyles.articleContent}>
              Please try again later.
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className={articleStyles.page}>
        <TopContent />
        <div>
          <SearchBar />
        </div>
        <div className={articleStyles.layout}>
          <div className={articleStyles.article}>
            <div className={articleStyles.articleTitle}>
              <span>
                {article[0].title}
                <br />
                {format(new Date(article[0].date), "do MMMM Y")} | views:{" "}
                {article[0].views}
                <br />
                {article[0].tags.slice(0, 3).map((tag) => (
                  <span key={tag} className={articleStyles.tags}>
                    {tag}
                  </span>
                ))}
              </span>
              <BookmarkButton user={user} title={article[0].title} />
            </div>
            <div className={articleStyles.articleContent}>
              {article[0].image ? (
                <div className={articleStyles.imageContainer}>
                  <img
                    className={articleStyles.picture}
                    src={article[0].image}
                    alt="ArticlePhoto"
                  />
                </div>
              ) : null}
              {article[0].body.map((i, counter) => (
                <>
                  <section id={counter}>
                    <div className={articleStyles.articleHeader}>
                      {i.header}
                    </div>
                  </section>
                  <div className={articleStyles.articleText}>
                    <div>{i.text}</div>
                  </div>
                  <br />
                </>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SpecificArticle;
