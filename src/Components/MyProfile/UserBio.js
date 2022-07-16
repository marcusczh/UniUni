import styles from "./MyProfile.module.css";

function UserBio({ userDetails }) {
  return (
    <>
      <div className={styles.aboutMe}>
        <span className={styles.label}>Bio:</span>
        <br />
        {userDetails ? userDetails.bio : "Not found"}
      </div>
    </>
  );
}

export default UserBio;
