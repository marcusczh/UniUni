import SearchBar from "../Global/Searchbar";
import stylesInterview from "./Interviews.module.css";
import RecommendedInterview from "./RecommendedInterview";
import OtherInterviews from "./OtherInterviews";
import { Link } from "react-router-dom";
import React from "react";
import axios from "axios";
import TopContent from "../Global/TopContent";

function Interviews() {
  const [interviews, setInterviews] = React.useState(null);
  React.useEffect(() => {
    axios
      .get(`http://localhost:4000/api/information?type=Interview`)
      .then((res) => {
        setInterviews(res.data);
      });
  }, []);

  if (!interviews) return null;

  return (
    <>
      <TopContent />
      <div>
        <SearchBar />
      </div>

      <Link
        to={`/Interviews/${interviews[0].title}`}
        className={stylesInterview.recommendedInterview}
      >
        <RecommendedInterview interview={interviews[0]} />
      </Link>
      <div className={stylesInterview.otherInterviews}>
        <div>
          <OtherInterviews interview={interviews[1] || null} />
        </div>
        <div>
          <OtherInterviews interview={interviews[2] || null} />
        </div>
        <div>
          <OtherInterviews interview={interviews[3] || null} />
        </div>
      </div>
    </>
  );
}

export default Interviews;
