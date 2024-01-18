import { useEffect, useState } from "react";
import styles from "./comment.module.css";
import UserService from "../services/UserService";
import { Link } from "react-router-dom";

function Comment (comment) {
    const {id, postId, userId, content} = comment.comment;
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    

    const getUserDetails = async () => {
        try {
            const userDetails = await UserService.getLoggedUserData(userId);
            setUser(userDetails);
        } catch (error) {
            console.error("Error fetching user details:", error);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        if (user === null) getUserDetails();
    }, []);

    return(
        <div className={styles['comment']}>            
            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    {user && user.data.name && (
                        <Link to={`/UserProfilePage/${userId}`} className={styles['comment-author']}>{user.data.name}</Link>
                    )}
                    <p className={styles['comment-text']}>{content}</p>
                </>
            )}
        </div>
    );
}
export default Comment;