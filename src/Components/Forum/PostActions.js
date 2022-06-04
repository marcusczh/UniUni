import styles from "./Forum.module.css";

function posts() {
    return (
        <>
        <button className={styles.button}>Create Post</button>
        <button className={styles.button}>View My Posts</button> 
        </>
    );
}

export default posts;