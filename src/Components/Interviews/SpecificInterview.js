import SearchBar from "../Global/Searchbar";
import interviewStyles from "./Interviews.module.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import TopContent from "../Global/TopContent";

function SpecificInterview() {
  const { title } = useParams();
  const [interview, setInterview] = useState([
    {
      title: "No Interview",
      date: "",
      tags: "",
      body: [{ header: "", text: "" }],
    },
  ]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .get("http://localhost:4000/api/information", {
        params: {
          type: "Interview",
          title: title,
        },
      })
      .then((res) => {
        console.log(res.data);
        setInterview(res.data);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, []); //eslint-

  if (loading) {
    return <div>loading...</div>;
  }
  if (interview.length === 0) {
    return (
      <>
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
      </>
    );
  } else {
    return (
      <>
        <TopContent />
        <div>
          <SearchBar />
        </div>
        <div className={interviewStyles.layout}>
          <div>
            <div className={interviewStyles.interviewHeader}>
              {interview[0].title}
              <br />
              {interview[0].date} | {interview[0].tags}
            </div>
            <div className={interviewStyles.interviewContent}>
              {interview[0].body.map((i, counter) => (
                <>
                  <div id={counter}>{i.header}</div>
                  <br />
                  <div>{i.text}</div>
                </>
              ))}
            </div>
          </div>
          <div className={interviewStyles.navigator}>
            Course Info
            <nav className={interviewStyles.navBar}>
              <ul className={interviewStyles.list}>
                <li className={interviewStyles.list}>Decision Making</li>
                <li className={interviewStyles.list}>Curriculum</li>
                <li className={interviewStyles.list}>Personal Experiences</li>
                <li className={interviewStyles.list}>Career Prospects</li>
                <li className={interviewStyles.list}>Student Life</li>
                <li className={interviewStyles.list}>Others</li>
              </ul>
            </nav>
          </div>
        </div>
      </>
    );
  }
}

export default SpecificInterview;
