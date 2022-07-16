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
        <div className={styles.articleTitle}>{article.title}</div>
        <div className={styles.articleContent}>
          {article.image}
          {article.body.map((i) => (
            <div id={i}>
              <div className={styles.articleHeader}> {i.header}</div>
              <div className={styles.articleText}>{i.text}</div>
            </div>
          ))}
        </div>
      </>
    );
  }
}

export default recommendedArticle;
