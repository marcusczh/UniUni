import SearchBar from "../Global/Searchbar";
import Posts from "./Posts";
import PostActions from "./PostActions";
import TopContent from "../Global/TopContent";
import { useState, useEffect } from "react";
import axios from "axios";

function Forum() {
  const [posts, setPosts] = useState(null);
  const [numPosts, setNumPosts] = useState(4);
  useEffect(() => {
    axios.get(`/api/information?type=Forum`).then((res) => {
      setPosts(res.data);
    });
  }, []);

  const viewMore = () => {
    setNumPosts(numPosts * 2);
  };

  if (!posts) return null;

  return (
    <>
      <TopContent />
      <div>
        <SearchBar />
        <PostActions numPosts={numPosts} viewMore={viewMore} />
      </div>
      <div>
        {posts
          .slice(0, Math.min(numPosts, posts.length))
          .sort((a, b) => b.score - a.score)
          .map((post) => (
            <Posts post={post} id={post} />
          ))}
      </div>
    </>
  );
}

export default Forum;
