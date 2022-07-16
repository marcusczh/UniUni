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
        <span className={styles.recommendedHeader}>
          <span className={styles.recommendedTitle}>{article.title}</span>
          {article.tags.slice(0, 1).map((tag) => (
            <>
              <div className={styles.tags}>{tag}</div>
            </>
          ))}
        </span>
        <div className={styles.recommendedContent}>
          <div>
            {article.body.map((i) => (
              <div id={i}>
                {i.header}
                <br />
                {i.text}
              </div>
            ))}
          </div>
          <img src={article.image}></img>
        </div>
      </>
    );
  }
}

export default recommendedArticle;
