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
            <div className={articleStyles.articleHeader}>No articles.</div>
            <div className={articleStyles.articleContent}>
              Please try again later.
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    //console.log(article[0].views);
    return (
      <div className={articleStyles.page}>
        <TopContent />
        <div>
          <SearchBar />
        </div>
        <div className={articleStyles.layout}>
          <div>
            <div className={articleStyles.articleHeader}>
              {article[0].title}
              <br />
              {article[0].date} | {article[0].tags} | views: {article[0].views}
              <BookmarkButton user={user} title={article[0].title} />
            </div>
            <div className={articleStyles.articleContent}>
              {article[0].image ? (
                <div className={articleStyles.imageContainer}>
                  <img
                    className={articleStyles.picture}
                    src={article[0].image}
                  />
                </div>
              ) : null}
              {article[0].body.map((i, counter) => (
                <>
                  <section id={counter}>
                    <b>
                      <u>{i.header}</u>
                    </b>
                  </section>
                  <br />
                  <div>{i.text}</div>
                  <br />
                </>
              ))}
            </div>
          </div>

          <nav className={articleStyles.navBar}>
            <div className={articleStyles.navigator}>
              <nav>
                <div className="link-con">
                  {article[0].body.map((i, counter) => (
                    <>
                      <Link
                        to="./"
                        className={articleStyles.list}
                        name={i.header}
                        id={i}
                      >
                        {i.header}
                      </Link>
                    </>
                  ))}
                </div>
              </nav>
              {/* <ul className={articleStyles.list}>
                {article[0].body.map((i, counter) => (
                  <li
                    className={articleStyles.list}
                    /* onClick={
                       references.current[counter]
                        ? window.scrollTo({
                            top: references.current[counter].offsetTop,
                            bahavior: "smooth",
                          })
                        : null/
                  >
                    {i.header}
                  </li>
                ))}
              </ul> */}
            </div>
          </nav>
        </div>
      </div>
    );
  }
}

export default SpecificArticle;
