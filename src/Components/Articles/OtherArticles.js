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
        {article.body.map((i) => (
          <div className={styles.otherArticlesContent}>
            {i.header}
            <br />
            {i.text}
          </div>
        ))}
      </div>
    );
  }
}

export default otherArticles;
