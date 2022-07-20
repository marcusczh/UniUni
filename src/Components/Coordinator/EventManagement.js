/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import SearchBar from "../Global/Searchbar";
import Events from "./Events";
import TopContent from "../Global/TopContent";
import DeleteEvent from "./DeleteEvent";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styles from "./Coordinator.module.css";
import { selectUser } from "../../features/userSlice";
import { useSelector } from "react-redux";
import EventActions from "./EventActions";
import TeleInfo from "./TeleInfo";

function EventManagement() {
  const [events, setEvents] = useState(null);
  const [numEvents, setNumEvents] = useState(4);
  const user = useSelector(selectUser);
  useEffect(() => {
    axios.get(`/api/events/?author=${user.username}`).then((res) => {
      setEvents(res.data);
    });
  }, []);

  const viewMore = () => {
    setNumEvents(numEvents * 2);
  };

  const reloadEvents = () => {
    axios.get(`/api/events/?author=${user.username}`).then((res) => {
      console.log("reloaded!");
      setEvents(res.data);
    });
  };

  if (!user || !events || events.length === 0) {
    return (
      <>
        <TopContent />
        <div>
          <SearchBar />
          <EventActions numEvents={numEvents} viewMore={viewMore} />
        </div>
        <button className={styles.button}>
          <Link to={`../Coordinator`}>Back</Link>
        </button>
        <Events event={null} />
      </>
    );
  }

  return (
    <>
      <TopContent />
      <div>
        <SearchBar />
        <TeleInfo />
        <div className={styles.actionsContainer}>
          <EventActions numEvents={numEvents} viewMore={viewMore} />
          <button className={styles.button}>
            <Link className={styles.removeDecoration} to={`../Coordinator`}>
              Back
            </Link>
          </button>
        </div>
      </div>

      <div>
        {events.slice(0, Math.min(numEvents, events.length)).map((event) => (
          <Events event={event}>
            <DeleteEvent
              events={events}
              reloadEvents={reloadEvents}
              eventTitle={event.title}
              eventId={event._id}
              user={event.author}
            />
          </Events>
        ))}
      </div>
    </>
  );
}

export default EventManagement;
