import styles from "./Interviews.module.css";

function otherInterviews({ interview }) {
  if (interview == null) {
    return (
      <div>
        <div className={styles.otherInterviewsTitle}>No Interviews Found</div>
        <div className={styles.otherInterviewsContent}>Try again later</div>
      </div>
    );
  } else {
    return (
      <div>
        <div className={styles.otherInterviewsTitle}>{interview.title}</div>
        <div className={styles.otherInterviewsContent}>
          {interview.body.map((i) => (
            <div id={i}>
              <div className={styles.otherInterviewsHeader}> {i.header}</div>
              <div className={styles.otherInterviewsText}>{i.text}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default otherInterviews;
