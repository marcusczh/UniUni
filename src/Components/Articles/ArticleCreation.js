import articleStyles from "./Articles.module.css";
/*import { Link } from "react-router-dom";*/
import { useState } from "react";
import TopContent from "../Global/TopContent";

function ArticlesCreation() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  return (
    <>
      <TopContent />
      <div>
        <div className={articleStyles.title}>
          <form>
            <input
              type="text"
              placeholder="Title of article"
              value={title}
              id="formInput"
              onChange={(e) => setTitle(e.target.value)}
            ></input>
          </form>
        </div>
        <div className={articleStyles.content}>
          <form>
            <input
              type="text"
              placeholder="Content"
              className={articleStyles.contentInput}
              value={content}
              id="formInput"
              onChange={(e) => setContent(e.target.value)}
            ></input>
          </form>

          <button className={articleStyles.button}>Cancel</button>
          <button className={articleStyles.button}>Create Article</button>
        </div>
      </div>
    </>
  );
}

export default ArticlesCreation;
