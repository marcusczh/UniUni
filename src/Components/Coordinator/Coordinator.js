import axios from "axios";
import { useState, useEffect } from "react";
import SearchBar from "../Global/Searchbar";
import TopContent from "../Global/TopContent";
import styles from "./Coordinator.module.css";
import EventActions from "./EventActions";
import Events from "./Events";

export default function Coordinator() {
  const [events, setEvents] = useState(null);
  const [numEvents, setNumEvents] = useState(4);
  const today = new Date();

  useEffect(() => {
    axios.get(`/api/events`).then((res) => {
      //console.log(res.data);
      setEvents(res.data);
    });
  }, []);

  const viewMore = () => {
    setNumEvents(numEvents * 2);
  };

  if (!events) return null;

  console.log(events.filter((e) => new Date(e.date) > today));

  return (
    <div className={styles.page}>
      <TopContent />
      <div>
        <SearchBar />
        <div className={styles.actionsContainer}>
          <EventActions numEvents={numEvents} viewMore={viewMore} />
        </div>
      </div>
      <div className={styles.eventBackground}>
        <div className={styles.announcement}>
          Join an event, or create your very own! <br />
          Viewing{" "}
          {Math.min(
            numEvents,
            events.filter((e) => new Date(e.date) > today).length
          )}{" "}
          upcoming events:
        </div>
        {events
          .filter((e) => new Date(e.date) > today)
          .slice(
            0,
            Math.min(
              numEvents,
              events.filter((e) => new Date(e.date) > today).length
            )
          )
          .sort((a, b) => b.score - a.score)
          .map((event) => (
            <Events event={event} id={event} />
          ))}
      </div>

      <div className={styles.eventBackground2}>
        <div className={styles.announcement}>
          Viewing{" "}
          {Math.min(
            numEvents,
            events.filter((e) => new Date(e.date) < today).length
          )}{" "}
          Past events:
        </div>
        {events
          .filter((e) => new Date(e.date) < today)
          .slice(
            0,
            Math.min(
              numEvents,
              events.filter((e) => new Date(e.date) < today).length
            )
          )
          .sort((a, b) => b.score - a.score)
          .map((event) => (
            <Events event={event} id={event} />
          ))}
      </div>
    </div>
  );
}
