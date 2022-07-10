import articleStyles from "./Articles.module.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import TopContent from "../Global/TopContent";
import { selectUser } from "../../features/userSlice";
import { useSelector } from "react-redux";
import AddingTags from "../Global/AddingTags";

function ArticlesCreation() {
  const [title, setTitle] = useState("");
  const [header, setHeader] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);
  const user = useSelector(selectUser);
  let navigate = useNavigate();

  function submitArticle(event) {
    event.preventDefault();
    let obj = {};
    obj.header = header;
    obj.text = content;
    axios
      .post("/api/create", {
        type: "Article",
        title: title,
        date: Date(),
        tags: tags,
        body: [obj],
        views: 0,
        author: user.username,
      })
      .then((res) => {
        if (res.data.status === "error") {
          alert("error");
        } else {
          navigate("/Articles", { replace: true });
          //window.location.href = "./";
        }
      })
      .catch((err) => console.log(err));
  }

  return (
    <>
      <TopContent />
      <div>
        <form
          onSubmit={(e) => {
            submitArticle();
          }}
        >
          <div className={articleStyles.title}>
            <input
              type="text"
              placeholder="Title of article"
              className={articleStyles.titleInput}
              value={title}
              id="formInput"
              onChange={(e) => setTitle(e.target.value)}
            ></input>
          </div>
          <div className={articleStyles.content}>
            <input
              type="text"
              placeholder="Header"
              className={articleStyles.contentInput}
              value={header}
              id="formInput"
              onChange={(e) => setHeader(e.target.value)}
            ></input>
            <input
              type="text"
              placeholder="Content"
              className={articleStyles.contentInput}
              value={content}
              id="formInput"
              onChange={(e) => setContent(e.target.value)}
            ></input>

            <button
              className={articleStyles.button}
              onClick={(event) => navigate("/Articles", { replace: true })}
            >
              Cancel
            </button>
            <button className={articleStyles.button} onClick={submitArticle}>
              Create Article
            </button>
            <div className={articleStyles.tagsContainer}>
              <AddingTags setTags={setTags} tags={tags} />
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default ArticlesCreation;
