import styles from "./Forum.module.css";
import { Link } from "react-router-dom";
import { selectUser } from "../../features/userSlice";
import { useSelector } from "react-redux";

function PostActions({ viewMore }) {
  const user = useSelector(selectUser);
  return (
    <>
      <button className={styles.button} onClick={viewMore}>
        View More Posts
      </button>
      <button className={styles.button}>
        {user ? (
          <Link to="/Forum/Create" className={styles.link}>
            Create Post
          </Link>
        ) : (
          <span>Create Post</span>
        )}
      </button>
      <button className={styles.button}>
        {user ? (
          <Link to="/Forum/MyPosts" className={styles.link}>
            View My Posts
          </Link>
        ) : (
          <span>View My Posts</span>
        )}
      </button>
    </>
  );
}

export default PostActions;
