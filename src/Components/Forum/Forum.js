import SearchBar from "../Global/Searchbar";
import Posts from "./Posts";
import PostActions from "./PostActions";
import TopContent from "../Global/TopContent";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function Forum() {
  const [posts, setPosts] = useState(null);
  const [numPosts, setNumPosts] = useState(4);
  useEffect(() => {
    axios.get(`http://localhost:4000/api/forum`).then((res) => {
      console.log(res.data);
      setPosts(res.data);
    });
  }, []);

  const viewMore = () => {
    setNumPosts(numPosts + 1);
  };

  if (!posts) return null;

  return (
    <>
      <TopContent />
      <div>
        <SearchBar />
        <PostActions numPosts={numPosts} viewMore={viewMore} />
      </div>
      <div className="postContainer">
        {posts.slice(0, Math.min(numPosts, posts.length)).map((post) => (
          <Posts post={post} />
        ))}
      </div>
    </>
  );
}

export default Forum;
