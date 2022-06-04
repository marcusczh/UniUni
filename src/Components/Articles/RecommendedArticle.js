import styles from "./Articles.module.css";

function recommendedArticle() {
    return (
        <>
        <div className={styles.articleHeader}>
        Y3 NUS Business Administration 
        </div>
        <div className={styles.articleContent}> 
        Course Info
        Question 1 | How would you describe your course to someone who knows nothing about it? 
        <br />
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
        Ut enim ad minim veniam, quis nostrud exercitation ullamco
        </div>
    </>
    );
}

export default recommendedArticle;