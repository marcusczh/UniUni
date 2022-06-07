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

  if (!guides) return null;

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
          <OtherGuides guide={guides[1] || null} />
        </div>
        <div>
          <OtherGuides guide={guides[2] || null} />
        </div>
        <div>
          <OtherGuides guide={guides[3] || null} />
        </div>
      </div>
    </>
  );
}

export default Guides;
