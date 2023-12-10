import styles from "./comment.module.css";

function Comment () {


    return(
        <div className={styles['comment']}>
            <p className={styles['comment-author']}>John Doe</p>
            <p className={styles['comment-text']}>This is a great post!</p>
        </div>
    );
}
export default Comment;