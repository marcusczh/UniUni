import SearchBar from "../Global/Searchbar";
import Posts from "./Posts";
import TopContent from "../Global/TopContent";
import DeletePost from "./DeletePost";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styles from "./Forum.module.css";
import { selectUser } from "../../features/userSlice";
import { useSelector } from "react-redux";

function PostManagement() {
  const [posts, setPosts] = useState(null);
  const [numPosts, setNumPosts] = useState(4);
  const user = useSelector(selectUser);
  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/forum?user=${user.username}`)
      .then((res) => {
        setPosts(res.data);
      });
  }, []);

  const reloadPosts = () => {
    axios
      .get(`http://localhost:4000/api/forum?user=${user.username}`)
      .then((res) => {
        console.log("reloaded!");
        setPosts(res.data);
      });
  };

  if (!posts || posts.length === 0) {
    return (
      <>
        <TopContent />
        <div>
          <SearchBar />
        </div>
        <button className={styles.button}>
          <Link to={`../Forum`}>Back</Link>
        </button>
        <Posts post={null} />
      </>
    );
  }

  return (
    <>
      <TopContent />
      <div>
        <SearchBar />
      </div>
      <button className={styles.button}>
        <Link to={`../Forum`}>Back</Link>
      </button>
      <div className={styles.postList}>
        {posts.slice(0, Math.min(numPosts, posts.length)).map((post) => (
          <Posts post={post}>
            <DeletePost
              posts={posts}
              reloadPosts={reloadPosts}
              postTitle={post.title}
              postId={post._id}
            />
          </Posts>
        ))}
      </div>
    </>
  );
}

export default PostManagement;
