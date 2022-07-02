import ProfileTabs from "./ProfileTabs";
import { selectUser } from "../../features/userSlice";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./MyProfile.module.css";
import NavBar from "../Global/Navbar";

export default function MyProfile() {
  const [posts, setPosts] = useState(null);
  const user = useSelector(selectUser);

  //To be changed to query information based on bookmarked posts
  useEffect(() => {
    if (user)
      axios
        .post(`/information`, { title: { $in: user.bookmarks } })
        .then((res) => {
          console.log(user.bookmarks);
          console.log(res.data);
          setPosts(res.data);
        });
  }, []);

  return user ? (
    <>
      <div className={styles.Page}>
        <div className={styles.PageLeft}>..</div>
        <div className={styles.PageRight}>
          <div className={styles.TopRow}>
            <div className={styles.CustomNav}>
              <NavBar />
            </div>
            <div className={styles.Credibility}>
              Credibility Score: {user.score} ⭐
            </div>
          </div>

          <div className={styles.ProfileTabsContainer}>
            <ProfileTabs posts={posts} />
          </div>
        </div>
      </div>
    </>
  ) : (
    <div className={styles.SignInMessage}>Please sign in first</div>
  );
}
