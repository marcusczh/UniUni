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
  const [more, setMore] = React.useState(false);
  React.useEffect(() => {
    axios.get(`/api/information?type=Interview`).then((res) => {
      setInterviews(res.data);
    });
  }, []);

  const [viewAll, setViewAll] = React.useState(4);
  const viewMore = () => {
    setViewAll(interviews.length);
    setMore(true);
  };

  if (!interviews) return null;

  return (
    <div className={stylesInterview.page}>
      <TopContent />
      <div>
        <SearchBar />
      </div>
      <div className={stylesInterview.actions}>
        <button className={stylesInterview.button} onClick={viewMore}>
          View more Interviews
        </button>
      </div>
      <div className={stylesInterview.interviewDisplay}>
        <div className={stylesInterview.recommendedContainer}>
          <Link
            to={`/Interviews/${interviews[0].title}`}
            className={stylesInterview.recommendedInterview}
          >
            <RecommendedInterview interview={interviews[0]} />
          </Link>
        </div>
        <div className={stylesInterview.otherInterviews}>
          <div className={stylesInterview.otherInterviewsContainer}>
            <Link
              to={`/Interviews/${interviews[1].title}`}
              className={stylesInterview.otherInterviews}
            >
              <OtherInterviews interview={interviews[1] || null} />
            </Link>
          </div>

          <div className={stylesInterview.otherInterviewsContainer}>
            <Link
              to={`/Interviews/${interviews[2].title}`}
              className={stylesInterview.otherInterviews}
            >
              <OtherInterviews interview={interviews[2] || null} />
            </Link>
          </div>
          <div className={stylesInterview.otherInterviewsContainer}>
            <Link
              to={`/Interviews/${interviews[3].title}`}
              className={stylesInterview.otherInterviews}
            >
              <OtherInterviews interview={interviews[3] || null} />
            </Link>
          </div>
        </div>
      </div>
      <div className={stylesInterview.postContainer}>
        {more && <p>More interviews below...</p>}
        {interviews
          .slice(4, Math.min(viewAll, interviews.length))
          .sort((a, b) => b.views - a.views)
          .map((interview) => (
            <List post={interview} />
          ))}
      </div>
    </div>
  );
}

export default Interviews;
