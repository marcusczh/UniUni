import SearchBar from "../Global/Searchbar";
import articleStyles from "./Articles.module.css";
import { useLocation, useParams, Link } from "react-router-dom";
import { React, useState, useEffect, useRef } from "react";
import axios from "axios";
import TopContent from "../Global/TopContent";

function SpecificArticle() {
  const { title } = useParams();
  // const { location } = useLocation();
  const [article, setArticle] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/information", {
        params: {
          type: "Article",
          title: title,
        },
      })
      .then((res) => {
        console.log(res.data);
        setArticle(res.data);
        setLoading(false);
      })
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
      <>
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
      </>
    );
  } else {
    return (
      <>
        <TopContent />
        <div>
          <SearchBar />
        </div>
        <div className={articleStyles.layout}>
          <div>
            <div className={articleStyles.articleHeader}>
              {article[0].title}
              <br />
              {article[0].date} | {article[0].tags}
            </div>
            <div className={articleStyles.articleContent}>
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
      </>
    );
  }
}

export default SpecificArticle;
