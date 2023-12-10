import { useEffect, useState } from "react";
import styles from "./comment.module.css";
import UserService from "../services/UserService";

function Comment (comment) {
    const {id, postId, userId, content} = comment.comment;
    const [user, setUser] = useState('');
    const [loading, setLoading] = useState(true);
    

    const getUserDetails = async () => {
        try {
            const userDetails = await UserService.getLoggedUserData(userId);
            console.log("User details received:", userDetails);
            setUser(userDetails);
        } catch (error) {
            console.error("Error fetching user details:", error);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        getUserDetails();
    }, []);

    return(
        <div className={styles['comment']}>            
            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    {user && user.data.name && (
                        <p className={styles['comment-author']}>{user.data.name}</p>
                    )}
                    <p className={styles['comment-text']}>{content}</p>
                </>
            )}
        </div>
    );
}
export default Comment;