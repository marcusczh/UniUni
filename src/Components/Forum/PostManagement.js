/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import SearchBar from "../Global/Searchbar";
import Posts from "./MyPosts";
import TopContent from "../Global/TopContent";
import DeletePost from "./DeletePost";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styles from "./Forum.module.css";
import { selectUser } from "../../features/userSlice";
import { useSelector } from "react-redux";
import PostActions from "./PostActions";

function PostManagement() {
  const [posts, setPosts] = useState(null);
  const [numPosts, setNumPosts] = useState(4);
  const user = useSelector(selectUser);
  useEffect(() => {
    axios
      .get(`/api/information/?type=Forum&author=${user.username}`)
      .then((res) => {
        setPosts(res.data);
      });
  }, []);

  const viewMore = () => {
    setNumPosts(numPosts * 2);
  };

  const reloadPosts = () => {
    axios
      .get(`/api/information/?type=Forum&author=${user.username}`)
      .then((res) => {
        console.log("reloaded!");
        setPosts(res.data);
      });
  };

  if (!user || !posts || posts.length === 0) {
    return (
      <>
        <TopContent />
        <div>
          <SearchBar />
          <PostActions numPosts={numPosts} viewMore={viewMore} />
        </div>
        <button className={styles.button}>
          <Link className={styles.link} to={`../Forum`}>
            <span className={styles.link}>Back</span>
          </Link>
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
        <PostActions numPosts={numPosts} viewMore={viewMore} />
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
              user={post.author}
            />
          </Posts>
        ))}
      </div>
    </>
  );
}

export default PostManagement;
