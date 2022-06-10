import styles from "./Forum.module.css";

function comments({ comment }) {
    if (comment != null) {
        return (
        <div className={styles.comments}>
            {comment.body}
            <br/>
            <br/>
            {"By: " + comment.user} |
            {"Likes: " + comment.likes} | 
            {"Dislikes: " + comment.dislikes}
        </div>
        );
    }
}

export default comments;