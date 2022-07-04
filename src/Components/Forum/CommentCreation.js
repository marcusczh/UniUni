import forumStyles from "./Forum.module.css";
import { useState } from "react";
import TopContent from "../Global/TopContent";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { selectUser } from "../../features/userSlice";
import { useSelector } from "react-redux";

function CommentCreation() {
  const user = useSelector(selectUser);
  const [body, setBody] = useState("");
  const { title } = useParams();
  let navigate = useNavigate();

  function submitComment(event) {
    event.preventDefault();
    axios
      .post("/api/createcomment/" + title, {
        body: body,
        date: Date(),
        author: user ? user.username : "anonymous",
        likes: 0,
        dislikes: 0,
        score: 0,
      })
      .then((res) => {
        navigate(`../Forum/${title}`, { replace: true });
      });
  }

  return (
    <>
      <TopContent />
      <div>
        <div className={forumStyles.title}>Comment:</div>
        <div className={forumStyles.content}>
          <form>
            <input
              type="text"
              placeholder="Content"
              className={forumStyles.contentInput}
              id="formInput"
              onChange={(e) => setBody(e.target.value)}
            ></input>
          </form>
          <button
            className={forumStyles.buttonCreation}
            onClick={(event) => navigate(-1)}
          >
            Cancel
          </button>
          <button
            className={forumStyles.buttonCreation}
            onClick={submitComment}
          >
            Create Comment
          </button>
        </div>
      </div>
    </>
  );
}

export default CommentCreation;
