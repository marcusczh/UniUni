import styles from "./Coordinator.module.css";
import { Link } from "react-router-dom";
import { format } from "date-fns";

function Events({ event, children }) {
  if (event == null) {
    return (
      <>
        <div className={styles.eventContainer}>No Events Found</div>
      </>
    );
  } else {
    return (
      <div className={styles.eventContainer}>
        <div className={styles.eventTop}>
          <Link
            to={`/Coordinator/${encodeURIComponent(event.title)}`}
            className={styles.eventTitle}
          >
            {event.title}
          </Link>
          {children && <div className={styles.popup}>{children}</div>}
        </div>

        <div className={styles.details}>
          <div className={styles.eventUser}>{"By: " + event.author}</div>
          <div className={styles.stats}>
            {"date: " + format(new Date(event.date), "MM/dd/yyyy") + "  ||  "}
            {"location: " + event.location + "  ||  "}
            {"participants: " + event.participants.length}
          </div>
        </div>
      </div>
    );
  }
}

export default Events;
