/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import SearchBar from "../Global/Searchbar";
import guideStyles from "./Guides.module.css";
import TopContent from "../Global/TopContent";
import { useLocation, useParams, Link } from "react-router-dom";
import { React, useState, useEffect, useRef } from "react";
import axios from "axios";

function SpecificGuide() {
  const { title } = useParams();
  const [guide, setGuide] = useState([]);
  const [loading, setLoading] = useState(true);
  const [flag, setFlag] = useState(true);

  // Fetch data only after view count is updated
  useEffect(() => {
    axios
      .get("/api/information", {
        params: {
          type: "Guide",
          title: title,
        },
      })
      .then((res) => {
        setGuide(res.data);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, [flag]);

  // Update view count
  useEffect(() => {
    axios
      .post("/api/informationviews", {
        params: {
          type: "Guide",
          title: title,
        },
      })
      .then(setFlag(!flag))
      .catch((error) => console.log(error));
  }, []);

  if (loading) {
    return <div>loading...</div>;
  }

  if (guide.length === 0) {
    return (
      <div className={guideStyles.page}>
        <TopContent />
        <div>
          <SearchBar />
        </div>
        <div className={guideStyles.layout}>
          <div>
            <div className={guideStyles.articleHeader}>No guides.</div>
            <div className={guideStyles.articleContent}>
              Please try again later.
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className={guideStyles.page}>
        <TopContent />
        <div>
          <SearchBar />
        </div>
        <div className={guideStyles.layout}>
          <div>
            <div className={guideStyles.guideHeader}>
              <span>
                {guide[0].title}
                <br />
                {guide[0].date} | views: {guide[0].views}
                <br />
                {guide[0].tags.slice(0, 3).map((tag) => (
                  <span key={tag} className={guideStyles.tags}>
                    {tag}
                  </span>
                ))}
              </span>
            </div>
            <div className={guideStyles.guideContent}>
              {guide[0].body.map((i, counter) => (
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

          <nav className={guideStyles.navBar}>
            <div className={guideStyles.navigator}>
              <nav>
                <div className="link-con">
                  {guide[0].body.map((i, counter) => (
                    <>
                      <Link
                        to="./"
                        className={guideStyles.list}
                        name={i.header}
                      >
                        {i.header}
                      </Link>
                    </>
                  ))}
                </div>
              </nav>
            </div>
          </nav>
        </div>
      </div>
    );
  }
}

export default SpecificGuide;
