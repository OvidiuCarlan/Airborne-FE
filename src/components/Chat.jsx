import styles from "./chat.module.css";
import { Link } from "react-router-dom";

function Chat({friend, userId}) {
    
    return(
        <div className={styles.chat_container}>
            <div className={styles.name}>
                <Link to={`/UserProfilePage/${friend.id}`} className={styles.friend}>{friend.name}</Link>
            </div>
            <div className={styles.chat}>

            </div>
            <div className={styles.type_container}>
                <textarea  className={styles.message} placeholder=" Type a message " required></textarea>
                <button className={styles.message_button} type="submit">Send</button>
            </div>
        </div>
    );
}
export default Chat;