/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import ProfileTabs from "./ProfileTabs";
import { selectUser } from "../../features/userSlice";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./MyProfile.module.css";
import UserProfile from "./UserProfile";
import AboutMe from "./AboutMe";
import UserBio from "./UserBio";
import NavBar from "../Global/Navbar";

export default function MyProfile({ userDetails, setUserDetails }) {
  const [posts, setPosts] = useState(null);
  const [events, setEvents] = useState(null);
  const user = useSelector(selectUser);
  // Fetch profile information
  useEffect(() => {
    if (user)
      axios.get(`/api/profile?username=${user.username}`).then((res) => {
        setUserDetails(res.data);
      });
  }, []);

  useEffect(() => {
    if (user)
      axios
        .post(`/api/information`, { title: { $in: user.bookmarks } })
        .then((res) => {
          //console.log(user.bookmarks);
          //console.log(res.data);
          setPosts(res.data);
        });
  }, []);

  useEffect(() => {
    if (user) {
      if (user.events.length !== 0) {
        axios
          .get(`/api/events`, { params: { title: user.events } })
          .then((res) => {
            //console.log(user.events);
            //console.log(res.data);
            setEvents(res.data);
          });
      } else {
        setEvents([]);
      }
    }
  }, []);

  return user ? (
    <>
      <div className={styles.Page}>
        <div className={styles.PageLeft}>
          <UserProfile userDetails={userDetails} />
          <UserBio userDetails={userDetails} />
          <AboutMe userDetails={userDetails} />
        </div>
        <div className={styles.PageRight}>
          <div className={styles.TopRow}>
            <div className={styles.CustomNav}>
              <NavBar />
            </div>
            <div className={styles.Credibility}>
              Credibility Score: {userDetails.score} ⭐
            </div>
          </div>

          <div className={styles.ProfileTabsContainer}>
            <ProfileTabs posts={posts} events={events} />
          </div>
        </div>
      </div>
    </>
  ) : (
    <div className={styles.SignInMessage}>Please sign in first</div>
  );
}
