import styles from "./Forum.module.css";
import { Link } from "react-router-dom";
function posts({ post, children }) {
  if (post == null) {
    return (
      <>
        <div className={styles.postContainer}>No Posts Found</div>
      </>
    );
  } else {
    console.log(post);
    return (
      <div className={styles.postContainer}>
        <div className={styles.postSmall}>
          <Link to={`/Forum/${post.title}`}>{post.title}</Link>
          <br />
          By: {post.author}
          Likes: {post.likes} Dislikes: {post.dislikes}
        </div>
        {children && <div className={styles.popup}>{children}</div>}
      </div>
    );
  }
}

export default posts;
