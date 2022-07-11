import { useState } from "react";
import styles from "./Coordinator.module.css";
import axios from "axios";

function DeleteEvent({ eventTitle, eventId, reloadEvents, user }) {
  const [modal, setModal] = useState(false);
  const [confirmation, setConfirmation] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };
  const toggleConfirmation = () => {
    setConfirmation(!confirmation);
  };
  const deleteEvent = () => {
    setConfirmation(false);
    setModal(false);
    axios.delete(`/api/events/${eventTitle}/${eventId}/${user}`).then((res) => {
      if (res.data.status === "ok") {
        alert("Successfully deleted");
        reloadEvents();
      } else {
        alert(res.data.error);
        reloadEvents();
      }
    });
  };

  return (
    <>
      {!modal && (
        <button onClick={toggleModal} className={styles.toggle}>
          &middot; &middot; &middot;
        </button>
      )}

      {modal && (
        <>
          <div>
            <button
              onClick={toggleConfirmation}
              className={styles.deleteButton}
            >
              Delete this event
            </button>

            <button className={styles.closeButton} onClick={toggleModal}>
              Close
            </button>
          </div>
        </>
      )}
      {confirmation && (
        <>
          <div onClick={toggleConfirmation} className={styles.overlay}></div>
          <div className={styles.confirmationPopup}>
            Are you sure you want to delete the following event?
            <p className={styles.postWarning}>"{eventTitle}"</p>
            <p className={styles.postWarning}>This action cannot be undone!</p>
            <div className={styles.buttonContainer}>
              <button className={styles.yes} onClick={deleteEvent}>
                Yes
              </button>
              <button
                onClick={() => {
                  toggleConfirmation();
                  toggleModal();
                }}
              >
                No
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default DeleteEvent;
