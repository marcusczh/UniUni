import ProfileTabs from "./ProfileTabs";
import { selectUser } from "../../features/userSlice";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./MyProfile.module.css";

export default function MyProfile() {
  const [posts, setPosts] = useState(null);
  const user = useSelector(selectUser);

  //To be changed to query information based on bookmarked posts
  useEffect(() => {
    if (user)
      axios
        .get(`http://localhost:4000/api/information/?author=${user.username}`)
        .then((res) => {
          setPosts(res.data);
        });
  }, []);

  return (
    <div className={styles.PagePlaceholder}>
      <div className={styles.ProfileTabsContainer}>
        <ProfileTabs posts={posts} />
      </div>
    </div>
  );
}
