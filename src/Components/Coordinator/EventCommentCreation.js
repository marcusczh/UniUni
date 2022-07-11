import styles from "./Coordinator.module.css";
import { useState } from "react";
import TopContent from "../Global/TopContent";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { selectUser } from "../../features/userSlice";
import { useSelector } from "react-redux";

function EventCommentCreation() {
  const user = useSelector(selectUser);
  const [body, setBody] = useState("");
  const { title } = useParams();
  let navigate = useNavigate();

  function submitComment(event) {
    event.preventDefault();
    axios
      .post("/api/events/createcomment/" + title, {
        body: body,
        date: Date(),
        author: user ? user.username : "anonymous",
        likes: [],
        dislikes: [],
        score: 0,
      })
      .then((res) => {
        navigate(`../Coordinator/${title}`, { replace: true });
      });
  }

  return (
    <>
      <TopContent />
      <div>
        <div className={styles.title}>Comment:</div>
        <div className={styles.content}>
          <form>
            <input
              type="text"
              placeholder="Content"
              className={styles.contentInput}
              id="formInput"
              onChange={(e) => setBody(e.target.value)}
            ></input>
          </form>
          <button
            className={styles.buttonCreation}
            onClick={(event) => navigate(-1)}
          >
            Cancel
          </button>
          <button className={styles.buttonCreation} onClick={submitComment}>
            Create Comment
          </button>
        </div>
      </div>
    </>
  );
}

export default EventCommentCreation;
