import styles from "./commentSection.module.css";

function Post () {    
    return(        
        <div className={styles['comments']}>
            <div className={styles['comment-container']}>
                <div className={styles['comment']}>
                    <p className={styles['comment-author']}>John Doe</p>
                    <p className={styles['comment-text']}>This is a great post!</p>
                </div>
                <div className={styles['comment']}>
                    <p className={styles['comment-author']}>Jane Smith</p>
                    <p className={styles['comment-text']}>I really enjoyed reading this!</p>
                </div>
            </div>

            <form className={styles['comment-form']}>
                <textarea className={styles['comment-input']} placeholder=" Your Comment" required></textarea>
                <button className={styles['comment-button']} type="submit">Submit</button>
            </form>
        </div>         
    );
}
export default Post;
