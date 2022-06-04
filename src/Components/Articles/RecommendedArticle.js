import styles from "./Articles.module.css";

function recommendedArticle(props) {
  return (
    <>
      <div className={styles.articleHeader}>{props.article.title}</div>
      <div className={styles.articleContent}>{props.article.body}</div>
    </>
  );
}

export default recommendedArticle;
