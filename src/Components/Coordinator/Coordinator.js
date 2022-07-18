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
  useEffect(() => {
    axios.get(`/api/events`).then((res) => {
      console.log(res.data);
      setEvents(res.data);
    });
  }, []);

  const viewMore = () => {
    setNumEvents(numEvents * 2);
  };

  if (!events) return null;

  return (
    <div className={styles.page}>
      <TopContent />
      <div>
        <SearchBar />
        <EventActions numEvents={numEvents} viewMore={viewMore} />
      </div>
      <div className={styles.eventBackground}>
        <div className={styles.announcement}>
          Join an event or create your very own! <br />
          Viewing {Math.min(numEvents, events.length)} events:
        </div>
        {events
          .slice(0, Math.min(numEvents, events.length))
          .sort((a, b) => b.score - a.score)
          .map((event) => (
            <Events event={event} id={event} />
          ))}
      </div>
    </div>
  );
}
