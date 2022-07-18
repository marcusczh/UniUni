/* eslint-disable react-hooks/exhaustive-deps */
import SearchBar from "../Global/Searchbar";
import BookmarkButton from "../Global/BookmarkButton";
import eventStyles from "./Coordinator.module.css";
import Comments from "./Comments";
import TopContent from "../Global/TopContent";
import { useParams } from "react-router-dom";
import { React, useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { selectUser } from "../../features/userSlice";
import { useSelector } from "react-redux";
import { format } from "date-fns";
import EventActions from "./EventActions";
import TeleInfo from "./TeleInfo";

function SpecificEvent() {
  const { title } = useParams();
  const [event, setEvent] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = useSelector(selectUser);

  useEffect(() => {
    axios
      .get(`/api/events?title=${title}`)
      .then((res) => {
        setEvent(res.data);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  async function join(event) {
    axios
      .put(`/api/events/join`, {
        title: title,
        username: user.username,
        telegramHandle: user.teleHandle,
      })
      .then(() =>
        axios.get(`/api/events?title=${title}`).then((res) => {
          setEvent(res.data);
        })
      );
  }

  async function leave(event) {
    axios
      .delete(`/api/events/leave`, {
        data: {
          title: title,
          username: user.username,
          telegramHandle: user.teleHandle,
        },
      })
      .then(() =>
        axios.get(`/api/events?title=${title}`).then((res) => {
          setEvent(res.data);
        })
      );
  }

  if (loading) {
    return <div>loading...</div>;
  }
  console.log(event.length);
  if (event.length === 0) {
    return (
      <>
        <TopContent />
        <div>
          <SearchBar />
          <EventActions />
        </div>
        <div>
          <div className={eventStyles.eventHeader}>No event found</div>
          <div className={eventStyles.eventContent}>
            <br />
          </div>
        </div>
      </>
    );
  } else {
    return (
      <div className={eventStyles.page}>
        <TopContent />
        <div>
          <SearchBar />
        </div>
        <TeleInfo />
        <div>
          <div className={eventStyles.eventHeader}>
            <span>
              {event[0].title}
              <br />
              {"By: " + event[0].author}
              <br />
              {"Date: " + format(new Date(event[0].date), "MM/dd/yyyy")} |
              {" 👥: " + event[0].participants.length}
              <br />
              {event[0].tags.length !== 0
                ? event[0].tags.slice(0, 3).map((tag) => (
                    <span key={tag} className={eventStyles.tags}>
                      {tag}
                    </span>
                  ))
                : null}
            </span>
            <div>
              {user ? (
                event[0].participants.includes(user.username) ? (
                  <BookmarkButton
                    user={user}
                    title={event[0].title}
                    join={join}
                    leave={leave}
                    participating={true}
                    type="event"
                  />
                ) : (
                  <BookmarkButton
                    user={user}
                    title={event[0].title}
                    join={join}
                    leave={leave}
                    participating={false}
                    type="event"
                  />
                )
              ) : null}
            </div>
          </div>
          <div className={eventStyles.eventContent}>
            {event[0].image ? (
              <div className={eventStyles.imageContainer}>
                <img
                  className={eventStyles.picture}
                  src={event[0].image}
                  alt="EventPhoto"
                />
              </div>
            ) : null}
            <br />
            {event[0].body[0].text}
          </div>
        </div>
        {event[0].comments
          .sort((a, b) => b.score - a.score)
          .map((i, counter) => (
            <Comments
              comment={i || null}
              title={event[0].title || null}
              index={counter}
              setEvent={setEvent}
            />
          ))}
        {user ? (
          //Re-map to event comments
          <Link to={`./CreateComment?title=${event[0].title}`}>
            <button className={eventStyles.button}>Create Comment</button>
          </Link>
        ) : (
          //DUD button if no user, maybe send a pop-up to ask user to create an account first
          <button>{null}</button>
        )}
      </div>
    );
  }
}

export default SpecificEvent;
