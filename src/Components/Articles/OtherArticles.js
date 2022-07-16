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
        <div className={styles.otherArticlesTitle}>{article.title}</div>
        <div className={styles.otherArticlesContent}>
          {article.body.map((i) => (
            <div id={i}>
              <div className={styles.articleHeader}> {i.header}</div>
              <div className={styles.articleText}>{i.text}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default otherArticles;
