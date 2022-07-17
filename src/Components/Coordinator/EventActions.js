import styles from "./Coordinator.module.css";
import { Link } from "react-router-dom";
import { selectUser } from "../../features/userSlice";
import { useSelector } from "react-redux";
import { useState } from "react";

function EventActions({ viewMore }) {
  const [modal, setModal] = useState();
  const user = useSelector(selectUser);

  function toggleModal() {
    setModal(!modal);
  }
  return (
    <>
      {modal && (
        <>
          <div onClick={toggleModal} className={styles.overlay}></div>
          <div className={styles.confirmationPopup}>
            <p className={styles.postWarning}>
              You need a credibility score of at least 10 ⭐ to create an event!
            </p>
          </div>
        </>
      )}

      <div className={styles.actions}>
        <button className={styles.button} onClick={viewMore}>
          View More Events!
        </button>
        <button className={styles.button}>
          {user ? (
            //Change back to > 10 after user testing
            user.score > -1 ? (
              <Link to="/Coordinator/Create">Create Event</Link>
            ) : (
              <div onClick={toggleModal}> Create Event </div>
            )
          ) : (
            <span>Create Event</span>
          )}
        </button>
        <button className={styles.button}>
          {user ? (
            <Link
              className={styles.removeDecoration}
              to="/Coordinator/MyEvents"
            >
              View My Events
            </Link>
          ) : (
            <span>View My Events</span>
          )}
        </button>
      </div>
    </>
  );
}

export default EventActions;
