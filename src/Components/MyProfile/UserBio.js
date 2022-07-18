import styles from "./MyProfile.module.css";

function UserBio({ userDetails }) {
  return (
    <>
      <div className={styles.aboutMe}>
        <span className={styles.label}>Bio</span>
        <br />
        <span className={styles.bio}>
          {userDetails ? userDetails.bio : "Not found"}
        </span>
      </div>
    </>
  );
}

export default UserBio;
