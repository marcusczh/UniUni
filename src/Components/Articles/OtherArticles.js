import styles from "./Articles.module.css";

function otherArticles({ article }) {
  if (article == null) {
    return (
      <div className={styles.otherArticlesContainer}>
        <div className={styles.otherArticlesHeader}>No Articles Found</div>
        <div className={styles.otherArticlesContent}>Try again later.</div>
      </div>
    );
  } else {
    return (
      <div className={styles.otherArticlesContainer}>
        <div className={styles.otherArticlesHeader}>{article.title}</div>
        <div className={styles.otherArticlesContent}>
        {article.body.map((i) => (
          <>
            {i.header}
            <br />
            {i.text}
          </>
        ))}
        </div>
      </div>
    );
  }
}

export default otherArticles;
