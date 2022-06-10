import styles from "./Articles.module.css";

function recommendedArticle({ article }) {
  if (article == null) {
    return (
      <>
        <div className={styles.articleHeader}>No Articles Found</div>
        <div className={styles.articleContent}>Try again later</div>
      </>
    );
  } else {
    return (
      <>
        <div className={styles.articleHeader}>{article.title}</div>
        <div className={styles.articleContent}>
          {article.body.map((i) => (
            <div>
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

export default recommendedArticle;
