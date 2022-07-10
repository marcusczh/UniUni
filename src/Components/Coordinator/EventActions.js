import styles from "./Coordinator.module.css";
import { Link } from "react-router-dom";
import { selectUser } from "../../features/userSlice";
import { useSelector } from "react-redux";

function EventActions({ viewMore }) {
  const user = useSelector(selectUser);
  return (
    <>
      <button className={styles.button} onClick={viewMore}>
        View More Events
      </button>
      <button className={styles.button}>
        {user ? (
          <Link to="/Coordinator/Create">Create Event</Link>
        ) : (
          <span>Create Event</span>
        )}
      </button>
      <button className={styles.button}>
        {user ? (
          <Link to="/Coordinator/MyEvents">View My Events</Link>
        ) : (
          <span>View My Events</span>
        )}
      </button>
    </>
  );
}

export default EventActions;
