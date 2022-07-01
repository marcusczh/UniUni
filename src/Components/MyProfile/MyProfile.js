import ProfileTabs from "./ProfileTabs";
import { selectUser } from "../../features/userSlice";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./MyProfile.module.css";
import TopContent from "../Global/TopContent";

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

  return (
    <>
      <TopContent />
      <div className={styles.PagePlaceholder}>
        <div className={styles.ProfileTabsContainer}>
          <ProfileTabs posts={posts} />
        </div>
      </div>
    </>
  );
}
