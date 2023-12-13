import Navbar from "../components/Navbar";
import styles from "./messagePage.module.css";
import chat from '../assets/images/chat.png';
import { useEffect, useState } from "react";
import TokenManager from "../services/TokenManager";
import FriendsList from "../components/FriendsList";
import Chat from "../components/Chat";


function MessagePage() {
    
    const claims = TokenManager.getClaims();
    const id = claims.userId;
    const [selectedFriend, setSelectedFriend] = useState(null);  
    
    useEffect(() => {
        console.log("Selected Friend:", selectedFriend);
    }, [selectedFriend]);

    return(
        <div>
            <Navbar />
            <div className={styles.message_box}>
                <div className={styles.message_box_left}>
                    <p>Your friends</p>
                    <div className={styles.friends_list}>
                        <FriendsList id={id} setSelectedFriend={setSelectedFriend}/>
                    </div>                   
                </div>
                <div className={styles.message_box_right}>
                    {selectedFriend ? (
                        <Chat friend={selectedFriend} userId={id}/>
                    ) : (
                        <div className={styles.message_content}>
                            <img src={chat} alt="Message Icon" className={styles.message_icon}/>
                            <div className={styles.message_text}>
                                <h1>Your Messages</h1>
                                <p>Send private messages to your friends</p>
                            </div>
                        </div>
                    )}
                    
                </div>      
            </div>            
        </div>
    );
}
export default MessagePage;