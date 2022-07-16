import SearchBar from "../Global/Searchbar";
import stylesGuide from "./Guides.module.css";
import RecommendedGuide from "./RecommendedGuide";
import OtherGuides from "./OtherGuide";
import { Link } from "react-router-dom";
import React from "react";
import axios from "axios";
import TopContent from "../Global/TopContent";
import List from "./List";

function Guides() {
  const [guides, setGuides] = React.useState(null);
  React.useEffect(() => {
    axios.get(`/api/information?type=Guide`).then((res) => {
      setGuides(res.data);
    });
  }, []);

  const [viewAll, setViewAll] = React.useState(4);
  const viewMore = () => {
    setViewAll(guides.length);
  };

  //Note: Unfinished error handling
  if (guides === null || guides.length < 4) {
    return (
      <div className={stylesGuide.page}>
        <TopContent />
        <div>
          <SearchBar />
        </div>
        No guides found.
      </div>
    );
  } else {
    return (
      <div className={stylesGuide.page}>
        <TopContent />
        <div>
          <SearchBar />
          <div className={stylesGuide.actions}>
            <button className={stylesGuide.button} onClick={viewMore}>
              View more posts
            </button>
          </div>
        </div>
        <div className={stylesGuide.recommendedContainer}>
          <Link
            to={{
              pathname: `/Guides/${guides[0].title}`,
              guide: guides[0],
            }}
            className={stylesGuide.recommendedGuide}
          >
            <RecommendedGuide guide={guides[0]} />
          </Link>
        </div>
        <div className={stylesGuide.otherGuides}>
          <div>
            <Link
              to={{
                pathname: `/Guides/${guides[1].title}`,
                guide: guides[0],
              }}
              className={stylesGuide.otherGuides}
            >
              <OtherGuides guide={guides[1] || null} />
            </Link>
          </div>
          <div>
            <Link
              to={`/Guides/${guides[2].title}`}
              className={stylesGuide.otherGuides}
            >
              <OtherGuides guide={guides[2] || null} />
            </Link>
          </div>
          <div>
            <Link
              to={{
                pathname: `/Guides/${guides[3].title}`,
                guide: guides[0],
              }}
              className={stylesGuide.otherGuides}
            >
              <OtherGuides guide={guides[3] || null} />
            </Link>
          </div>
        </div>
        <div className="postContainer">
          {guides
            .slice(4, Math.min(viewAll, guides.length))
            .sort((a, b) => b.views - a.views)
            .map((guide) => (
              <List post={guide} />
            ))}
        </div>
      </div>
    );
  }
}

export default Guides;
