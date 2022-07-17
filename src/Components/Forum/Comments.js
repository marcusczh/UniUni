import styles from "./Forum.module.css";
import axios from "axios";
import { selectUser } from "../../features/userSlice";
import { useSelector } from "react-redux";

function Comments({ comment, title, index, setForum }) {
  const user = useSelector(selectUser);

  function like(event, currUser) {
    event.preventDefault();
    // user already liked the comment, need to un-like
    if (comment.likes.includes(currUser)) {
      axios
        .post(
          `/api/un-likecomment/${title}/${comment.body}/${comment.author}/${index}`,
          {
            user: currUser,
          }
        )
        .then(() =>
          axios.get(`/api/Information?title=${title}`).then((res) => {
            setForum(res.data);
          })
        );
      // like the comment as per normal
    } else {
      axios
        .post(
          `/api/likecomment/${title}/${comment.body}/${comment.author}/${index}`,
          {
            user: currUser,
          }
        )
        .then(() =>
          axios.get(`/api/Information?title=${title}`).then((res) => {
            setForum(res.data);
          })
        );
    }
  }

  function dislike(event, currUser) {
    event.preventDefault();
    // user already disliked the comment, need to un-dislike
    if (comment.dislikes.includes(currUser)) {
      axios
        .post(
          `/api/un-dislikecomment/${title}/${comment.body}/${comment.author}/${index}`,
          {
            user: currUser,
          }
        )
        .then(() =>
          axios.get(`/api/Information?title=${title}`).then((res) => {
            setForum(res.data);
          })
        );
      // dislike the comment as per normal
    } else {
      axios
        .post(
          `/api/dislikecomment/${title}/${comment.body}/${comment.author}/${index}`,
          {
            user: currUser,
          }
        )
        .then(() =>
          axios.get(`/api/Information?title=${title}`).then((res) => {
            setForum(res.data);
          })
        );
    }
  }

  if (comment != null) {
    return (
      <div className={styles.comments}>
        {comment.body}
        <br />
        <br />
        {"By: " + comment.author} |{"Likes: " + comment.likes.length} |
        {"Dislikes: " + comment.dislikes.length}
        {user ? (
          comment.likes.includes(user.username) ? (
            <button
              className={styles.moreOptions}
              onClick={(event) => like(event, user.username)}
            >
              un-like
            </button>
          ) : comment.dislikes.includes(user.username) ? null : (
            <button
              className={styles.moreOptions}
              onClick={(event) => like(event, user.username)}
            >
              like
            </button>
          )
        ) : null}
        {user ? (
          comment.dislikes.includes(user.username) ? (
            <button
              className={styles.moreOptions}
              onClick={(event) => dislike(event, user.username)}
            >
              un-dislike
            </button>
          ) : comment.likes.includes(user.username) ? null : (
            <button
              className={styles.moreOptions}
              onClick={(event) => dislike(event, user.username)}
            >
              dislike
            </button>
          )
        ) : null}
      </div>
    );
  }
}

export default Comments;
