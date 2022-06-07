import forumStyles from "./Forum.module.css";
import { useState } from "react";
import TopContent from "../Global/TopContent";

function ForumCreation() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  return (
    <>
      <TopContent />
      <div>
        <div className={forumStyles.title}>
          <form>
            <input
              type="text"
              placeholder="Title of forum"
              value={title}
              id="formInput"
              onChange={(e) => setTitle(e.target.value)}
            ></input>
          </form>
        </div>
        <div className={forumStyles.content}>
          <form>
            <input
              type="text"
              placeholder="Content"
              className={forumStyles.contentInput}
              value={content}
              id="formInput"
              onChange={(e) => setContent(e.target.value)}
            ></input>
            <input type="file" accept="image/*"></input>
          </form>
          <button className={forumStyles.buttonCreation}>Cancel</button>
          <button className={forumStyles.buttonCreation}>Create forum</button>
        </div>
      </div>
    </>
  );
}

export default ForumCreation;
