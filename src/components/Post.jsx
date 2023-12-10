import styles from "./post.module.css";
import CommentSection from "./CommentSection";

function Post ({post}) {    
    const {id, userId, content, image, dateTime} = post;
    return(
        <div className={styles['post-outline']}>
            <div className={styles['post']}> 
            <p className={styles['date']}>{dateTime}</p>
            <h2>{content}</h2>
                {image=="" || image==null?"": <img className={styles['post-image']} src={image}/>}
            </div>
            <div className={styles['comments']}>
                <CommentSection postId={post.id} userId={post.userId}/>
            </div>          
        </div>
    );
}
export default Post;