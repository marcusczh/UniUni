import SearchBar from "../Global/Searchbar";
import forumStyles from "./Forum.module.css";
import PostActions from "./PostActions";
import Comments from "./Comments";
import TopContent from "../Global/TopContent";
import { useParams } from "react-router-dom";
import { React, useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { selectUser } from "../../features/userSlice";
import { useSelector } from "react-redux";

function SpecificForum() {
  const { title } = useParams();
  const [forum, setForum] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = useSelector(selectUser);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/information", {
        params: {
          type: forum,
          title: title,
        },
      })
      .then((res) => {
        setForum(res.data);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  function increment(event, likes, dislikes) {
    event.preventDefault();
    axios
      .post(`http://localhost:4000/api/like/${title}/${forum[0].author}`, {
        likes: likes,
        dislikes: dislikes,
      })
      .then(() =>
        axios
          .get(
            `http://localhost:4000/api/information?title=${title}&type=Forum`
          )
          .then((res) => {
            setForum(res.data);
          })
      );
  }

  if (loading) {
    return <div>loading...</div>;
  }
  console.log(forum.length);
  if (forum.length === 0) {
    return (
      <>
        <TopContent />
        <div>
          <SearchBar />
          <PostActions />
        </div>
        <div>
          <div className={forumStyles.forumHeader}>No posts found</div>
          <div className={forumStyles.forumContent}>
            <br />
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <TopContent />
        <div>
          <SearchBar />
          <PostActions />
        </div>
        <div>
          <div className={forumStyles.forumHeader}>
            {forum[0].title}
            <br />
            {"By: " + forum[0].author}
            <br />
            {forum[0].date} |{forum[0].tags} |{"Likes: " + forum[0].likes} |
            {"Dislikes: " + forum[0].dislikes} |
            {"Comments: " + forum[0].comments.length}
            <div>
              <button
                className={forumStyles.moreOptions}
                onClick={(event) => increment(event, 1, 0)}
              >
                like
              </button>
              <button
                className={forumStyles.moreOptions}
                onClick={(event) => increment(event, 0, 1)}
              >
                dislike
              </button>
            </div>
          </div>
          <div className={forumStyles.forumContent}>
            {forum[0].image != null ? (
              <img
                src={"image/jpeg" + forum[0].image}
                //alt="User submitted"
              ></img>
            ) : null}
            {forum[0].body[0].text}
          </div>
        </div>
        {forum[0].comments
          .sort((a, b) => b.score - a.score)
          .map((i, counter) => (
            <Comments
              comment={i || null}
              title={forum[0].title || null}
              index={counter}
              setForum={setForum}
            />
          ))}
        {user ? (
          <Link
            to={`./CreateComment?title=${forum[0].title}&user=${user.username}`}
          >
            <button>Create Comment</button>
          </Link>
        ) : (
          //DUD button if no user, maybe send a pop-up to ask user to create an account first
          <button>Create Comment</button>
        )}
      </>
    );
  }
}

export default SpecificForum;
