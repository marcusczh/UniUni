import styles from "./Interviews.module.css";

function recommendedInterview({ interview }) {
  if (interview == null) {
    return (
      <>
        <div className={styles.interviewHeader}>No Interview Found</div>
        <div className={styles.interviewContent}>Try again later</div>
      </>
    );
  } else {
    return (
      <>
        <div className={styles.interviewHeader}>{interview.title}</div>
        {interview.body.map((i) => (
          <div className={styles.interviewContent} id={i}>
            {i.header}
            <br />
            {i.text}
          </div>
        ))}
      </>
    );
  }
}

export default recommendedInterview;
