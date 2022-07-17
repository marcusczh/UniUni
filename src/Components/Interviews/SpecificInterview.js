/* eslint-disable react-hooks/exhaustive-deps */
import SearchBar from "../Global/Searchbar";
import interviewStyles from "./Interviews.module.css";
import BookmarkButton from "../Global/BookmarkButton";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { selectUser } from "../../features/userSlice";
import { useSelector } from "react-redux";
import axios from "axios";
import { format } from "date-fns";
import TopContent from "../Global/TopContent";

function SpecificInterview() {
  const { title } = useParams();
  const user = useSelector(selectUser);

  const [interview, setInterview] = useState([
    {
      title: "No Interview",
      date: "",
      tags: "",
      body: [{ header: "", text: "" }],
    },
  ]);
  const [loading, setLoading] = useState(true);
  const [flag, setFlag] = useState(true);
  // Fetch data only after view count is updated
  useEffect(() => {
    axios
      .get("/api/information", {
        params: {
          type: "Interview",
          title: title,
        },
      })
      .then((res) => {
        setInterview(res.data);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, [flag]); //eslint-

  // Update view count
  useEffect(() => {
    axios
      .post("http://localhost:4000/api/informationviews", {
        params: {
          type: "Interview",
          title: title,
        },
      })
      .then(setFlag(!flag))
      .catch((error) => console.log(error));
  }, []);

  if (loading) {
    return <div>loading...</div>;
  }
  if (interview.length === 0) {
    return (
      <div className={interviewStyles.page}>
        <TopContent />
        <div>
          <SearchBar />
        </div>
        <div className={interviewStyles.layout}>
          <div>
            <div className={interviewStyles.interviewHeader}>No interview.</div>
            <div className={interviewStyles.interviewContent}>
              Please try again later.
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className={interviewStyles.page}>
        <TopContent />
        <div>
          <SearchBar />
        </div>
        <div className={interviewStyles.layout}>
          <div>
            <div className={interviewStyles.interviewTitle}>
              <span>
                {interview[0].title}
                <br />
                {format(new Date(interview[0].date), "do MMMM Y")} | views:{" "}
                {interview[0].views}
                {interview[0].tags.slice(0, 3).map((tag) => (
                  <span key={tag} className={interviewStyles.tags}>
                    {tag}
                  </span>
                ))}
              </span>
              <BookmarkButton user={user} title={interview[0].title} />
            </div>
            <div className={interviewStyles.interviewContent}>
              {interview[0].body.map((i, counter) => (
                <>
                  <div id={counter} className={interviewStyles.interviewHeader}>
                    {i.header}
                  </div>

                  <div className={interviewStyles.interviewText}>{i.text}</div>
                  <br />
                </>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SpecificInterview;
