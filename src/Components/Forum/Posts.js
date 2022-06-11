import styles from "./Forum.module.css";
import { Link } from "react-router-dom";

function Posts({ post, children }) {
  if (post == null) {
    return (
      <>
        <div className={styles.postContainer}>No Posts Found</div>
      </>
    );
  } else {
    return (
      <div className={styles.postContainer}>
        <div className={styles.postTitle}>
          <Link to={`/Forum/${post.title}`}>{post.title}</Link>
        </div>
        <div className={styles.details}>
          <div className={styles.postUser}>{"By: " + post.user}</div>
          <div className={styles.stats}>
            {"likes: " + post.likes + "  ||  "}
            {"dislikes: " + post.dislikes + "  ||  "}
            {"comments: " + post.comments.length}
          </div>
        </div>
        {children && <div className={styles.popup}>{children}</div>}
      </div>
    );
  }
}

export default Posts;
