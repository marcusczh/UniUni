import styles from "./Forum.module.css";
import { Link } from "react-router-dom";

function posts({ viewMore }) {
  return (
    <>
      <button className={styles.button} onClick={viewMore}>
        View More Posts
      </button>
      <button className={styles.button}>
        <Link to="/Forum/Create">Create Post</Link>
      </button>
      <button className={styles.button}>
        <Link to="/Forum/MyPosts">View My Posts</Link>
      </button>
    </>
  );
}

export default posts;
