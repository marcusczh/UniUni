import SearchBar from "../Global/Searchbar";
import stylesInterview from "./Interviews.module.css";
import RecommendedInterview from "./RecommendedInterview";
import OtherInterviews from "./OtherInterviews";
import { Link } from "react-router-dom";
import React from "react";
import axios from "axios";
import TopContent from "../Global/TopContent";
import List from "./List";

function Interviews() {
  const [interviews, setInterviews] = React.useState(null);
  React.useEffect(() => {
    axios
      .get(`http://localhost:4000/api/information?type=Interview`)
      .then((res) => {
        setInterviews(res.data);
      });
  }, []);

  const [viewAll, setViewAll] = React.useState(4);
  const viewMore = () => {
    setViewAll(interviews.length);
  };

  if (!interviews) return null;

  return (
    <>
      <TopContent />
      <div>
        <SearchBar />
        <button className={stylesInterview.button} onClick={viewMore}>
          View more posts
        </button>
      </div>

      <Link
        to={`/Interviews/${interviews[0].title}`}
        className={stylesInterview.recommendedInterview}
      >
        <RecommendedInterview interview={interviews[0]} />
      </Link>
      <div className={stylesInterview.otherInterviews}>
        <div>
          <Link
              to={`/Interviews/${interviews[1].title}`}
              className={stylesInterview.otherInterviews}
          >
            <OtherInterviews interview={interviews[1] || null} />
          </Link>
        </div>
        <div>
          <Link
                to={`/Interviews/${interviews[2].title}`}
                className={stylesInterview.otherInterviews}
            >
              <OtherInterviews interview={interviews[2] || null} />
          </Link>
        </div>
        <div>
          <Link
              to={`/Interviews/${interviews[3].title}`}
              className={stylesInterview.otherInterviews}
          >
            <OtherInterviews interview={interviews[3] || null} />
          </Link>
        </div>
      </div>
      <div className="postContainer">
        {interviews
          .slice(4, Math.min(viewAll, interviews.length))
          .sort((a, b) => b.views - a.views)
          .map((interview) => (
            <List post={interview} />
          ))}
      </div>
    </>
  );
}

export default Interviews;
