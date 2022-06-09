import styles from "./Forum.module.css";
import { Link } from "react-router-dom";

function posts() {
  return (
    <>
      <button className={styles.button}>Create Post</button>
      <button className={styles.button}>
        <Link to="/Forum/MyPosts">View My Posts</Link>
      </button>
    </>
  );
}

export default posts;
