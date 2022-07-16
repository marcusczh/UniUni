import styles from "./Interviews.module.css";

function recommendedInterview({ interview }) {
  if (interview == null) {
    return (
      <>
        <div className={styles.interviewTitle}>No Interview Found</div>
        <div className={styles.interviewContent}>Try again later</div>
      </>
    );
  } else {
    return (
      <>
        <div className={styles.interviewTitle}>
          {interview.title}
          {interview.tags.slice(0, 1).map((tag) => (
            <>
              <div className={styles.tags}>{tag}</div>
            </>
          ))}
        </div>
        <div className={styles.interviewContent} id>
          {interview.body.map((i) => (
            <div id={i}>
              <div className={styles.interviewHeader}> {i.header}</div>
              <div className={styles.interviewText}>{i.text}</div>
            </div>
          ))}
        </div>
      </>
    );
  }
}

export default recommendedInterview;
