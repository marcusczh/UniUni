/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { login, selectUser } from "../../features/userSlice";
import styles from "./Global.module.css";
import axios from "axios";

export default function BookmarkButton({ user, title }) {
  const [bookmarked, setBookmarked] = useState(false);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      axios
        .get("/api/fetchUser/", { params: { username: user.username } })
        .then((res) => {
          dispatch(login(res.data.user));
          for (let i = 0; i < res.data.user.bookmarks.length; i++) {
            if (res.data.user.bookmarks[i] === title) {
              setBookmarked(true);
            }
            setLoading(false);
          }
          //console.log(res.data.user.bookmarks);
        });
    }
  }, [bookmarked]);

  async function handleBookmark() {
    if (bookmarked) {
      await axios
        .delete(`/api/bookmark/`, {
          data: { username: user.username, title: title },
        })
        .then(setBookmarked(false));
    } else {
      await axios
        .put(`/api/bookmark/`, { username: user.username, title: title })
        .then(setBookmarked(true));
    }
  }

  return user ? (
    loading ? null : bookmarked ? (
      <div>
        <button
          className={styles.bookmarked}
          onClick={(e) => {
            e.preventDefault();
            handleBookmark();
          }}
        >
          Un-Bookmark
        </button>
      </div>
    ) : (
      <div>
        <button
          className={styles.BookmarkButton}
          onClick={(e) => {
            e.preventDefault();
            handleBookmark();
          }}
        >
          Bookmark
        </button>
      </div>
    )
  ) : null;
}
