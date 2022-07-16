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
          <div className={styles.otherGuidesTitle}>{guide.title}</div>
          <div className={styles.otherGuidesContent}>
            {guide.body.map((i) => {
              return i.header !== "links" ? (
                <div id={i}>
                  <div className={styles.guideHeader}> {i.header}</div>
                  <div className={styles.guideText}>{i.text}</div>
                </div>
              ) : null;
            })}
          </div>
        </div>
      </>
    );
  }
}

export default otherGuides;
