import ProfileTabs from "./ProfileTabs";
import { selectUser } from "../../features/userSlice";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./MyProfile.module.css";
import TopContent from "../Global/TopContent";
import UserProfile from "./UserProfile";
import AboutMe from "./AboutMe";

export default function MyProfile({ userDetails, setUserDetails }) {
  const [posts, setPosts] = useState(null);
  const user = useSelector(selectUser);
  // Fetch profile information
  useEffect(() => {
    if (user)
      axios
        .get(`http://localhost:4000/api/profile?username=${user.username}`)
        .then((res) => {
          setUserDetails(res.data);
        });
  }, []);

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
    <>
      <TopContent />
      <div className={styles.PagePlaceholder}>
        <div className={styles.userDetails}>
          <UserProfile userDetails={userDetails} />
          <AboutMe userDetails={userDetails} />
        </div>
        <div className={styles.ProfileTabsContainer}>
          <ProfileTabs posts={posts} />
        </div>
      </div>
    </>
  );
}
