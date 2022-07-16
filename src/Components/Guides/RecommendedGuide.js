import axios from "axios";
import React from "react";
import styles from "./Guides.module.css";
import ArticleList from "../Articles/List";
import ForumList from "../Forum/Posts";
import InterviewList from "../Interviews/List";
import GuideList from "./List";

function RecommendedGuide({ guide }) {
  const [posts, setPosts] = React.useState([]);
  const [loaded, setLoaded] = React.useState(false);
  React.useEffect(() => {
    axios
      .get(`/api/information`, {
        params: {
          title: guide.body
            .filter((i) => i.header === "links")[0]
            .text.split(","),
        },
      })
      .then((res) => {
        loadPosts(res.data);
        setLoaded(true);
      });
  });

  function loadPosts(data) {
    if (!loaded) {
      setPosts(data);
    }
  }

  if (guide == null) {
    return (
      <>
        <div className={styles.guideHeader}>No Guides found</div>
        <div className={styles.guideContent}>Try again later</div>
      </>
    );
  } else {
    return (
      <>
        <div className={styles.guideTitle}>
          {guide.title}
          {guide.tags.slice(0, 1).map((tag) => (
            <>
              <div className={styles.tags}>{tag}</div>
            </>
          ))}
        </div>
        <div className={styles.guideContent}>
          {guide.body.map((i) => {
            return i.header !== "links" ? (
              <div>
                <div className={styles.guideHeader}> {i.header}</div>
                <div className={styles.guideText}>{i.text}</div>
              </div>
            ) : null;
          })}
          {posts.map((i) => {
            console.log(i);
            return (
              <div className={styles.postLinks}>
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
      </>
    );
  }
}

export default RecommendedGuide;
