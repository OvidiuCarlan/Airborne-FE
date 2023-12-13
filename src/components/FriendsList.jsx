import FriendItem from "./FriendItem";
import FriendshipService from "../services/FriendshipService";
import { useEffect, useState } from "react";
import styles from "./friendsList.module.css";



function FriendsList({id, setSelectedFriend}){

    const [friendsList, setFriendsList] = useState([]);

    const getFriendsList = async () =>{
        try{
            const response = await FriendshipService.getAllFriends(id)
            setFriendsList(response.friends);
            console.log("Friends list: ", response.friends);
        } catch (error){
            console.log("Error fetching friends list ",error);
        }
    }

    const handleUserClick = (friend) => {
        setSelectedFriend(friend);
    };

    useEffect(() => {
        getFriendsList();
    }, []);

    const ShowFriends = ({friendsList}) => {
        if(!Array.isArray(friendsList) || friendsList.length === 0){
            return <p className={styles['no-friends']}>No friends yet.</p>
        }
        return(
            <div>
                {friendsList.map(friend =>(
                    <FriendItem key={friend.id} friend={friend} onClick={() => handleUserClick(friend)}/>
                ))}
            </div>
        );
    }

    return(
        <div>
            <ShowFriends friendsList={friendsList}/>
        </div>
    );
}
export default FriendsList;