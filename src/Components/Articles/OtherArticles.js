import styles from "./Articles.module.css";

function otherArticles() {
    return (
        <>
        <div className={styles.otherArticlesHeader}>
        Y3 NUS Business Administration 
        </div>
        <div className={styles.otherArticlesContent}> 
        Course Info
        <br />
        Question 1 | How would you describe your course to someone who knows nothing about it? 
        <br />
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
        Ut enim ad minim veniam, quis nostrud exercitation ullamco
        </div>
    </>
    );
}

export default otherArticles;