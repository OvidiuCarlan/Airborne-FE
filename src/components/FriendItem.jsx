import styles from "./friendItem.module.css";
import Avatar from '../assets/images/Avatar.png';

function FriendItem({friend, onClick }){

    const {id, name, content, email} = friend;

    const handleClick = () => {
        onClick(friend);
      };

    return(
        <div className={styles.friend_container} onClick={handleClick}>
            <img src={Avatar} alt='Logo' className={styles.picture}/>
            <p>{name}</p>
        </div>
    );
}
export default FriendItem;