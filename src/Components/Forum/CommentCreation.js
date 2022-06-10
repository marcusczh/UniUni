import forumStyles from "./Forum.module.css";
import { useState } from "react";
import TopContent from "../Global/TopContent";
import axios from "axios";
import { useParams } from "react-router-dom";

function CommentCreation() {
  const [body, setBody] = useState("");
  const { title, user } = useParams();

  function submitComment(event) {
    event.preventDefault();
    axios
      .post("http://localhost:4000/api/createcomment/" + 
      title, {
        body: body,
        date: Date(),
        user: user,
        likes: 0,
        dislikes: 0,
        score: 0
    })
    .then((res) => {
      window.location.href = "./"
    })
  }

  return (
    <>
      <TopContent />
      <div>
        <div className={forumStyles.title}>
          Comment:
        </div>
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
          <button className={forumStyles.buttonCreation} onClick={event => window.location.href = "./"}>Cancel</button>
          <button className={forumStyles.buttonCreation} onClick={submitComment}>Create Comment</button>
        </div>
      </div>
    </>
  );
}

export default CommentCreation;
