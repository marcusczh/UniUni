import { useState } from "react";
import styles from "./Forum.module.css";
import axios from "axios";

function DeletePost({ postTitle, postId, reloadPosts }) {
  const [modal, setModal] = useState(false);
  const [confirmation, setConfirmation] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };
  const toggleConfirmation = () => {
    setConfirmation(!confirmation);
  };
  const deletePost = () => {
    setConfirmation(false);
    setModal(false);
    axios
      .delete(`http://localhost:4000/api/forum/${postTitle}/${postId}`)
      .then((res) => {
        if (res.data.status === "ok") {
          alert("Successfully deleted");
          reloadPosts();
        } else {
          alert(res.data.error);
          reloadPosts();
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
          <div className={styles.modal}>
            <button
              onClick={toggleConfirmation}
              className={styles.deleteButton}
            >
              Delete this post
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
            Are you sure you want to delete the following post?
            <p className={styles.postWarning}>"{postTitle}"</p>
            <p className={styles.postWarning}>This action cannot be undone!</p>
            <div className={styles.buttonContainer}>
              <button className={styles.yes} onClick={deletePost}>
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

export default DeletePost;
