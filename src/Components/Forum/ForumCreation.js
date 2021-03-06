import forumStyles from "./Forum.module.css";
import { useState } from "react";
import TopContent from "../Global/TopContent";
import axios from "axios";
import { selectUser } from "../../features/userSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AddingTags from "../Global/AddingTags";

function ForumCreation() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const [imageLink, setImageLink] = useState("");
  const [tags, setTags] = useState([]);

  function submitForum(event) {
    event.preventDefault();
    let obj = {};
    obj.header = null;
    obj.text = content;
    axios
      .post("/api/create", {
        type: "Forum",
        title: title,
        date: Date(),
        tags: tags,
        body: [obj],
        views: 0,
        author: user.username,
        likes: [],
        dislikes: [],
        score: 0,
        image: imageLink,
      })
      .then((res) => {
        if (res.data.status === "error") {
          alert("Error: Duplicate title");
        } else {
          navigate("../Forum");
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
            submitForum();
          }}
        >
          <div className={forumStyles.title}>
            <input
              type="text"
              placeholder="Title of forum"
              className={forumStyles.titleInput}
              value={title}
              id="formInput"
              data-testid="title"
              onChange={(e) => setTitle(e.target.value)}
            ></input>
          </div>
          <div className={forumStyles.content}>
            <textarea
              type="text"
              placeholder="Content"
              className={forumStyles.contentInput}
              value={content}
              id="formInput"
              data-testid="content"
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
            <input
              type="text"
              placeholder="Image Link"
              className={forumStyles.imageInput}
              onChange={(e) => setImageLink(e.target.value)}
            />
            <img src={`${imageLink}`} alt="No img specified" />
            <br />
            <button
              className={forumStyles.buttonCreation}
              onClick={(event) => navigate("/Forum", { replace: true })}
            >
              Cancel
            </button>
            <button
              className={forumStyles.buttonCreation}
              onClick={(e) => {
                submitForum(e);
                if (title.length !== 0) {
                  alert("Successfully created!");
                }
              }}
              data-testid="submit"
            >
              Create forum
            </button>
            <div className={forumStyles.tagsContainer}>
              <AddingTags setTags={setTags} tags={tags} />
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default ForumCreation;
