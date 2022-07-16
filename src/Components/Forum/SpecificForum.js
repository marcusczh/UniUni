/* eslint-disable react-hooks/exhaustive-deps */
import SearchBar from "../Global/Searchbar";
import BookmarkButton from "../Global/BookmarkButton";
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
      .get("/api/information", {
        params: {
          type: "Forum",
          title: title,
        },
      })
      .then((res) => {
        setForum(res.data);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  function like(event, currUser) {
    event.preventDefault();
    // user already liked the post, need to un-like
    if (forum[0].likes.includes(currUser)) {
      axios
        .post(`/api/un-like/${title}/${forum[0].author}`, {
          user: currUser,
        })
        .then(() =>
          axios
            .get(`/api/information?title=${title}&type=Forum`)
            .then((res) => {
              setForum(res.data);
            })
        );
      // like the post as per normal
    } else {
      axios
        .post(`/api/like/${title}/${forum[0].author}`, {
          user: currUser,
        })
        .then(() =>
          axios
            .get(`/api/information?title=${title}&type=Forum`)
            .then((res) => {
              setForum(res.data);
            })
        );
    }
  }

  function dislike(event, currUser) {
    event.preventDefault();
    // user already disliked the post, need to un-dislike
    if (forum[0].dislikes.includes(currUser)) {
      //console.log(likers);
      axios
        .post(`/api/un-dislike/${title}/${forum[0].author}`, {
          user: currUser,
        })
        .then(() =>
          axios
            .get(`/api/information?title=${title}&type=Forum`)
            .then((res) => {
              setForum(res.data);
            })
        );
      // dislike the post as per normal
    } else {
      axios
        .post(`/api/dislike/${title}/${forum[0].author}`, {
          user: currUser,
        })
        .then(() =>
          axios
            .get(`/api/information?title=${title}&type=Forum`)
            .then((res) => {
              setForum(res.data);
            })
        );
    }
  }

  if (loading) {
    return <div>loading...</div>;
  }

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
      <div className={forumStyles.page}>
        <TopContent />
        <div>
          <SearchBar />
        </div>
        <div>
          <div className={forumStyles.forumHeader}>
            <span>
              {forum[0].title}
              <br />
              {"By: " + forum[0].author}
              <br />
              {forum[0].date} | {"Likes: " + forum[0].likes.length} |
              {"Dislikes: " + forum[0].dislikes.length} |
              {"Comments: " + forum[0].comments.length}
              <br />
              {forum[0].tags.slice(0, 3).map((tag) => (
                <span key={tag} className={forumStyles.tags}>
                  {tag}
                </span>
              ))}
            </span>
            <div>
              {forum[0].likes.includes(user.username) ? (
                <button
                  className={forumStyles.moreOptions}
                  onClick={(event) => like(event, user.username)}
                >
                  un-like
                </button>
              ) : forum[0].dislikes.includes(user.username) ? null : (
                <button
                  className={forumStyles.moreOptions}
                  onClick={(event) => like(event, user.username)}
                >
                  like
                </button>
              )}
              {forum[0].dislikes.includes(user.username) ? (
                <button
                  className={forumStyles.moreOptions}
                  onClick={(event) => dislike(event, user.username)}
                >
                  un-dislike
                </button>
              ) : forum[0].likes.includes(user.username) ? null : (
                <button
                  className={forumStyles.moreOptions}
                  onClick={(event) => dislike(event, user.username)}
                >
                  dislike
                </button>
              )}
              <BookmarkButton user={user} title={forum[0].title} />
            </div>
          </div>
          <div className={forumStyles.forumContent}>
            {forum[0].image ? (
              <div className={forumStyles.imageContainer}>
                <img
                  className={forumStyles.picture}
                  src={forum[0].image}
                  alt="Forum post"
                />
              </div>
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
          <Link to={`./CreateComment?title=${forum[0].title}`}>
            <button>Create Comment</button>
          </Link>
        ) : (
          //DUD button if no user, maybe send a pop-up to ask user to create an account first
          <button>Create Comment</button>
        )}
      </div>
    );
  }
}

export default SpecificForum;
