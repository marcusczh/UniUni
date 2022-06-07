import styles from "./Interviews.module.css";

function otherInterviews({ interview }) {
  if (interview == null) {
    return (
      <div className={styles.otherInterviewsContainer}>
        <div className={styles.otherInterviewsHeader}>No Interviews Found</div>
        <div className={styles.otherInterviewsContent}>Try again later</div>
      </div>
    );
  } else {
    return (
      <div className={styles.otherInterviewsContainer}>
        <div className={styles.otherInterviewsHeader}>{interview.title}</div>
        {interview.body.map((i) => (
          <div className={styles.otherInterviewsContent}>
            {i.header}
            <br />
            {i.text}
          </div>
        ))}
      </div>
    );
  }
}

export default otherInterviews;
