import styles from "./Coordinator.module.css";

function Comments({ comment }) {
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
