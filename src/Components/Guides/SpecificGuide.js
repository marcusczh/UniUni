/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import SearchBar from "../Global/Searchbar";
import guideStyles from "./Guides.module.css";
import TopContent from "../Global/TopContent";
import ArticleList from "../Articles/List";
import ForumList from "../Forum/Posts";
import InterviewList from "../Interviews/List";
import GuideList from "./List";
import { useLocation, useParams, Link } from "react-router-dom";
import { React, useState, useEffect, useRef } from "react";
import axios from "axios";
import { format } from "date-fns";
import BookmarkButton from "../Global/BookmarkButton";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";

function SpecificGuide() {
  const location = useLocation();
  const { title } = useParams();
  const [guide, setGuideUpdate] = useState();
  const [loading, setLoading] = useState(true);
  const [flag, setFlag] = useState(true);
  const [posts, setPosts] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const user = useSelector(selectUser);

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
        setGuideUpdate(res.data);
        setLoading(false);
        //console.log(res.data[0].body);
        return axios.get(`/api/information`, {
          params: {
            title: res.data[0].body
              .filter((i) => i.header === "links")[0]
              .text.split(","),
          },
        });
      })
      .then((res) => {
        loadPosts(res.data);
        setLoaded(true);
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

  function loadPosts(data) {
    if (!loaded) {
      setPosts(data);
    }
  }

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
            <div className={guideStyles.guideTitle}>
              <span>
                {guide[0].title}
                <br />
                {format(new Date(guide[0].date), "do MMMM Y")} | Views:{" "}
                {guide[0].views}
                <br />
                {guide[0].tags.slice(0, 3).map((tag) => (
                  <span key={tag} className={guideStyles.tags}>
                    {tag}
                  </span>
                ))}
              </span>
              <BookmarkButton user={user} title={guide[0].title} />
            </div>
            <div className={guideStyles.guideContent}>
              {guide[0].image ? (
                <div className={guideStyles.imageContainer}>
                  <img
                    className={guideStyles.picture}
                    src={guide[0].image}
                    alt="GuidePhoto"
                  />
                </div>
              ) : null}
              {guide[0].body.map((i) => {
                return i.header !== "links" ? (
                  <div>
                    <div className={guideStyles.guideHeader}> {i.header}</div>
                    <div className={guideStyles.guideText}>{i.text}</div>
                  </div>
                ) : null;
              })}
              {posts.map((i) => {
                //console.log(i);
                return (
                  <div className={guideStyles.postLinks}>
                    {i.type === "Interview" ? (
                      <InterviewList post={i} />
                    ) : i.type === "Article" ? (
                      <ArticleList post={i} />
                    ) : i.type === "Forum" ? (
                      <ForumList post={i} />
                    ) : (
                      <GuideList post={i} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SpecificGuide;
