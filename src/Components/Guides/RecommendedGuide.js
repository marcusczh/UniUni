import styles from "./Guides.module.css";

function recommendedGuide({ guide }) {
  if (guide == null) {
    return (
      <>
        <div className={styles.guideHeader}>No Guides found</div>
        <div className={styles.guideContent}>Try again later</div>
      </>
    );
  } else {
    return (
      <>
        <div className={styles.guideHeader}>{guide.title}</div>
        {guide.body.map((i) => (
          <div className={styles.guideContent}>
            {i.header}
            <br />
            {i.text}
          </div>
        ))}
      </>
    );
  }
}

export default recommendedGuide;
