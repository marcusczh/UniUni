import SearchBar from "../Global/Searchbar";
import stylesGuide from "./Guides.module.css";
import RecommendedGuide from "./RecommendedGuide";
import OtherGuides from "./OtherGuide";
import { Link } from "react-router-dom";
import React from "react";
import axios from "axios";
import TopContent from "../Global/TopContent";

function Guides() {
  const [guides, setGuides] = React.useState(null);
  React.useEffect(() => {
    axios
      .get(`http://localhost:4000/api/information?type=Guide`)
      .then((res) => {
        setGuides(res.data);
      });
  }, []);

  //Note: Unfinished error handling
  if (guides === null || guides.length < 4) {
    return (
      <>
        <TopContent />
        <div>
          <SearchBar />
        </div>
        No guides found.
      </>
    );
  } else {
    return (
      <>
        <TopContent />
        <div>
          <SearchBar />
        </div>
        <Link
          to={`/Guides/${guides[0].title}`}
          className={stylesGuide.recommendedGuide}
        >
          <RecommendedGuide guide={guides[0]} />
        </Link>
        <div className={stylesGuide.otherGuides}>
          <div>
            <Link
              to={`/Articles/${guides[1].title}`}
              className={stylesGuide.otherGuides}
            >
              <OtherGuides guide={guides[1] || null} />
            </Link>
          </div>
          <div>
            <Link
              to={`/Articles/${guides[2].title}`}
              className={stylesGuide.otherGuides}
            >
              <OtherGuides guide={guides[2] || null} />
            </Link>
          </div>
          <div>
            <Link
              to={`/Articles/${guides[3].title}`}
              className={stylesGuide.otherGuides}
            >
              <OtherGuides guide={guides[3] || null} />
            </Link>
          </div>
        </div>
      </>
    );
  }
}

export default Guides;
