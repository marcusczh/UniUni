import styles from "./Forum.module.css";
import axios from "axios";

function Comments({ comment, title, index, setForum }) {
  function increment(event, likes, dislikes) {
    event.preventDefault();
    axios
      .post(
        `http://localhost:4000/api/likecomment/${title}/${comment.body}/${comment.user}/${index}`,
        {
          likes: likes,
          dislikes: dislikes,
        }
      )
      .then(() =>
        axios
          .get(`http://localhost:4000/api/forum?title=${title}`)
          .then((res) => {
            setForum(res.data)
          })
      );
  }

  if (comment != null) {
    return (
      <div className={styles.comments}>
        {comment.body}
        <br />
        <br />
        {"By: " + comment.user} |{"Likes: " + comment.likes} |
        {"Dislikes: " + comment.dislikes}
        <button
          className={styles.moreOptions}
          onClick={(event) => increment(event, 1, 0)}
        >
          like
        </button>
        <button
          className={styles.moreOptions}
          onClick={(event) => increment(event, 0, 1)}
        >
          dislike
        </button>
      </div>
    );
  }
}

export default Comments;
