import styles from "./Global.module.css";
import { Link } from "react-router-dom";

function SearchResults({ result }) {
  let display;
  if (result.type === "Article") {
    display = <div className={styles.articleType}>{result.type}</div>;
  } else if (result.type === "Guide") {
    display = <div className={styles.guideType}>{result.type}</div>;
  } else if (result.type === "Interview") {
    display = <div className={styles.interviewType}>{result.type}</div>;
  } else {
    display = <div className={styles.forumType}>{result.type}</div>;
  }
  console.log(result);
  return (
    <div className={styles.resultContainer}>
      <div className={styles.resultTop}>
        <Link
          to={
            result.type === "Forum"
              ? `/${result.type}/${encodeURIComponent(result.title)}`
              : `/${result.type}s/${encodeURIComponent(result.title)}`
          }
          className={styles.resultTitle}
        >
          {result.title}
        </Link>
        {display}
      </div>

      <div className={styles.details}>
        <p className={styles.resultUser}>
          {/* {"By: " + result.user} */}
          {result.body[0].text}
        </p>
        <div className={styles.stats}>
          {result.type === "Forum" ? (
            <>
              {"❤️ : " + result.likes?.length + "  ||  "}
              {"😔 : " + result.dislikes?.length}
            </>
          ) : (
            <>{"views: " + result.views}</>
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchResults;
