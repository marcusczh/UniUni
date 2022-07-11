import styles from "./Coordinator.module.css";
import { selectUser } from "../../features/userSlice";
import { useSelector } from "react-redux";

function Comments({ comment }) {
  const user = useSelector(selectUser);

  if (comment != null) {
    return (
      <div className={styles.comments}>
        {comment.body}
        <br />
        <br />
        {"By: " + comment.author}
      </div>
    );
  }
}

export default Comments;
