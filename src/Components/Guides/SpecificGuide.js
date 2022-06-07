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

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/information", {
        params: {
          type: "Guide",
          title: title,
        },
      })
      .then((res) => {
        console.log(res.data);
        setGuide(res.data);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  if (loading) {
    return <div>loading...</div>;
  }

  if (guide.length === 0) {
    return (
      <>
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
      </>
    );
  } else {
    return (
      <>
        <TopContent />
        <div>
          <SearchBar />
        </div>
        <div className={guideStyles.layout}>
          <div>
            <div className={guideStyles.guideHeader}>
              {guide[0].title}
              <br />
              {guide[0].date} | {guide[0].tags}
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
      </>
    );
  }
}

export default SpecificGuide;
