import styles from "./Forum.module.css";

function posts({ forum }) {
    if (forum != null) {}
        return (
        <div className={styles.posts}>
            {forum.title}
            <br />
            {"By: " + forum.user}
            <div className={styles.stats}>
                {"likes: " + forum.likes + "  ||  "}
                {"dislikes: " + forum.dislikes + "  ||  "}
                {"comments: " + forum.comments.length}
            </div>
        </div>
        );
    }

export default posts;