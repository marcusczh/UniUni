import NavBar from "../Global/Navbar";
import LogOut from "../Global/Logout";
import styles from "../HomePage/HomePage.module.css";
import Logo from "../Global/Logo";
import articleStyles from "./Articles.module.css";
/*import { Link } from "react-router-dom";*/
import { useState } from "react";
import axios from "axios";

function ArticlesCreation() {
  const [title, setTitle] = useState("");
  const [header, setHeader] = useState("");
  const [content, setContent] = useState("");

  function submitArticle(event) {
    event.preventDefault();
    let obj = new Object();
    obj.header = header;
    obj.text = content;
    axios
      .post("http://localhost:4000/api/create", {
        type: "Article",
        title: title,
        date: Date(),
        tags: "",
        body: [obj],
        views: 0
      })
      .then((res) => {
        if (res.data.status === "error") {
          alert("error");
        } else {
          window.location.href = "./";
        }
      })
      .catch((err) => console.log(err));
  }

  return (
    <>
      <div className={styles.topContent}>
        <Logo />
        <NavBar />
        <LogOut />
      </div>
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
            <button className={articleStyles.button}>Cancel</button>
            <button className={articleStyles.button} onClick={submitArticle}>
              Create Article
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default ArticlesCreation;
