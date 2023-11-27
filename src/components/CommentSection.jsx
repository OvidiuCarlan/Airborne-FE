import styles from "./commentSection.module.css";

function Post () {    
    return(        
        <div className={styles['comments']}>
            <div className="commnent-container">
                <div class="comment">
                    <p class="comment-author">John Doe</p>
                    <p class="comment-text">This is a great post!</p>
                </div>
                <div class="comment">
                    <p class="comment-author">Jane Smith</p>
                    <p class="comment-text">I really enjoyed reading this!</p>
                </div>
            </div>

            <form className={styles['comment-form']}>
                <textarea id="comment" placeholder="Your Comment" required></textarea>
                <button type="submit">Submit</button>
            </form>
        </div>         
    );
}
export default Post;