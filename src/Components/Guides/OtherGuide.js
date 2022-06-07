import styles from "./Guides.module.css";

function otherGuides({ guide }) {
  if (guide == null) {
    return (
      <div className={styles.otherGuidesContainer}>
        <div className={styles.otherGuidesHeader}>No Guides Found</div>
        <div className={styles.otherGuidesContent}>Try again later.</div>
      </div>
    );
  } else {
    return (
      <>
        <div className={styles.otherGuidesContainer}>
          <div className={styles.otherGuidesHeader}>{guide.title}</div>
          {guide.body.map((i) => (
            <div className={styles.otherGuidesContent}>
              {i.header}
              <br />
              {i.text}
            </div>
          ))}
        </div>
      </>
    );
  }
}

export default otherGuides;
