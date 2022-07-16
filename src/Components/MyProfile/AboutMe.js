import styles from "./MyProfile.module.css";

function AboutMe({ userDetails }) {
  return (
    <>
      <div className={styles.aboutMe}>
        <span className={styles.label}>About me</span>
        <br />
        Current status:
        <br />
        {userDetails.currentStatus ? (
          <span className={styles.status}>{userDetails.currentStatus}</span>
        ) : null}
        <br />
        Past:
        <br />
        {userDetails.pastStatus
          ? userDetails.pastStatus.map((status) => (
              <span key={status} className={styles.status}>
                {status}
              </span>
            ))
          : null}
        <br />
        <br />
        Interests:
        <br />
        {userDetails.interests
          ? userDetails.interests.map((interest) => (
              <span key={interest} className={styles.status}>
                {interest}
                <br />
              </span>
            ))
          : null}
      </div>
    </>
  );
}

export default AboutMe;
