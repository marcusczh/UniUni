import SearchBar from "../Global/Searchbar";
import forumStyles from "./Forum.module.css";
import PostActions from "./PostActions";
import Comments from "./Comments";
import TopContent from "../Global/TopContent";
import { useParams } from "react-router-dom";
import { React, useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function SpecificForum() {
  const { title } = useParams();
  const [forum, setForum] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/forum", {
        params: {
          title: title
        }
      })
      .then((res) => {
        console.log(res.data);
        setForum(res.data);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

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
          <div className={forumStyles.forumHeader}>
            No posts found
          </div>
          <div className={forumStyles.forumContent}>
            <br/>
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
            {"By: " + forum[0].user} 
            <br />
            {forum[0].date} | 
            {forum[0].tags} | 
            {"Likes: " + forum[0].likes} | 
            {"Dislikes: " + forum[0].dislikes} | 
            {"Comments: " + forum[0].comments.length}
            <button className={forumStyles.moreOptions}>Delete post</button>
          </div>
          <div className={forumStyles.forumContent}>{forum[0].body}</div>
        </div>
        {forum[0].comments.sort((a, b) => a.score - b.score).map((i) => (
          <Comments comment={i || null}/>
        ))}
        <Link to={`./CreateComment?title=${forum[0].title}&user=${"user3"}`}>
          <button>
            Create Comment
          </button>
        </Link>
      </>
    );
  }
}

export default SpecificForum;
