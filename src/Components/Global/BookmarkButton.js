/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { login, selectUser } from "../../features/userSlice";
import styles from "./Global.module.css";
import axios from "axios";

export default function BookmarkButton({
  user,
  title,
  type,
  participating,
  join,
  leave,
}) {
  const [bookmarked, setBookmarked] = useState(false);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  let event = type === "event";

  useEffect(() => {
    if (user) {
      if (event) {
        axios
          .get("/api/fetchUser/", { params: { username: user.username } })
          .then((res) => {
            dispatch(login(res.data.user));
            for (let i = 0; i < res.data.user.events.length; i++) {
              if (res.data.user.events[i] === title) {
                setBookmarked(true);
              }
            }
            setLoading(false);
            console.log(res.data.user.events);
          });
      } else {
        axios
          .get("/api/fetchUser/", { params: { username: user.username } })
          .then((res) => {
            dispatch(login(res.data.user));
            for (let i = 0; i < res.data.user.bookmarks.length; i++) {
              if (res.data.user.bookmarks[i] === title) {
                setBookmarked(true);
              }
            }
            setLoading(false);
            console.log(res.data.user.bookmarks);
          });
      }
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

  async function handleEventBookmark() {
    if (bookmarked) {
      await axios
        .delete(`/api/events/bookmark`, {
          data: { username: user.username, title: title },
        })
        .then(setBookmarked(false));
      await leave();
    } else {
      await axios
        .put(`/api/events/bookmark`, { username: user.username, title: title })
        .then(setBookmarked(true));
      await join();
    }
  }

  return user ? (
    loading ? null : event ? (
      bookmarked ? (
        <div>
          <button
            className={styles.bookmarked}
            onClick={(e) => {
              e.preventDefault();
              handleEventBookmark();
            }}
          >
            Leave event
          </button>
        </div>
      ) : (
        <div>
          <button
            className={styles.BookmarkButton}
            onClick={(e) => {
              e.preventDefault();
              handleEventBookmark();
            }}
          >
            Join Event
          </button>
        </div>
      )
    ) : //Not an event
    bookmarked ? (
      <div>
        <button
          className={styles.bookmarked}
          onClick={(e) => {
            e.preventDefault();
            event ? handleEventBookmark() : handleBookmark();
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
            event ? handleEventBookmark() : handleBookmark();
          }}
        >
          Bookmark
        </button>
      </div>
    )
  ) : null;
}
