import styles from "../Forum/Forum.module.css";
import { Link } from "react-router-dom";

function Posts({ post, children }) {
  if (post == null) {
    return (
      <>
        <div className={styles.postContainer}>No Articles Found</div>
      </>
    );
  } else {
    return (
      <div className={styles.postContainer}>
        <div className={styles.postTop}>
          <Link to={`/Interviews/${encodeURIComponent(post.title)}`} className={styles.postTitle}>
            {post.title}
          </Link>
          {children && <div className={styles.popup}>{children}</div>}
        </div>

        <div className={styles.details}>
          <div className={styles.postUser}>{"By: " + post.author}</div>
          <div className={styles.stats}>{"views: " + post.views}</div>
        </div>
      </div>
    );
  }
}

export default Posts;
