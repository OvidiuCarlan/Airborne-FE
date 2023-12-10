import UserDetails from "../components/UserDetails";
import PostList from "../components/PostList";
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import styles from "./profilePage.module.css";
import Navbar from "../components/Navbar";
import UserService from "../services/UserService";
import TokenManager from "../services/TokenManager";
import FriendshipService from "../services/FriendshipService";

export function UserProfilePage(props){

    const [user, setUser] = useState();
    const [friendship, setFriendship] = useState({ id: null, status: 'NOT_FRIENDS' });
    const loggedUser = TokenManager.getClaims();
    const {id} = useParams();

    
    const getUserDetails = () => {
        UserService.getLoggedUserData(id)
                .then(userDetails => {
                    console.log("User details received:", userDetails);
                    setUser(userDetails);
                    if (userDetails && typeof userDetails === 'object') {
                        console.log("Setting user details:", userDetails);
                        checkFriendship()   
                    } else {
                        console.error("Invalid user details format or missing data:", userDetails);
                        setUser(null);
                    }
                })
                .catch(error => {
                    console.error("Error fetching user details:", error);
                });
    }
    const checkFriendship = () =>{
        if (loggedUser?.userId && id){
            FriendshipService.checkFriendship(loggedUser.userId, id)
                .then(response => {
                    console.log("Friendship status:", response);
                    if(response.status === 'ACCEPTED'){
                        setFriendship({...friendship, status: "ACCEPTED"});
                    }else if(response.status === 'REQUESTED'){
                        setFriendship({...friendship, status: "REQUESTED"});
                    }else {
                        setFriendship({...friendship, status: "NOT_FRIENDS"});
                    }
                    setFriendship(prevState => ({ ...prevState, id: response.id }));
                })
                .catch(error => {
                    console.error("Failed to check friendship status:", error);
                });
        }
    }

    useEffect(() => {
        getUserDetails();             
    }, [id, loggedUser?.userId, friendship.status]);

    const ShowUserDetails = () => {
        if (!user) {
            return <>Loading...</>
        }
        return (
            <UserDetails userDetails={user} />
        );
    }

    //TODO: Change setFriendshipStatus to REQUESTED after sending friend request
    const SendFriendRequest = () => {
        if(loggedUser?.userId && id ){

            FriendshipService.addFriend(loggedUser.userId, id)
                .then(response => {
                    console.log("Friend request sent successfully");
                    setFriendship({ ...friendship, status: 'ACCEPTED' });
                })
                .catch(error => {
                    console.error("Failed to send friend request:", error);
                });
        }else {
            console.log("Invalid user IDs to send friend request");
        }
    }

    const RemoveFriend = () =>{
        if(friendship.id){
            const confirmation = window.confirm("Are you sure you want to remove this friend?");
            if(confirmation){
                FriendshipService.deleteFriendship(friendship.id)
                .then(() =>{
                    console.log("Friendship deleted successfully!");
                    setFriendship({ ...friendship, status: 'NOT_FRIENDS' });
                })
                .catch(error => {
                    console.error("Failed to delete friendship:", error);
                });
            }            
        }
    }

    const getButtonText = () => {
        switch (friendship.status) {
          case 'NOT_FRIENDS':
            return 'Add friend';
          case 'REQUESTED':
            return 'Requested';
          case 'ACCEPTED':
            return 'Remove friend';
          default:
            return 'Add friend';
        }
    };
    const handleButtonClick = () => {
        switch (friendship.status) {
          case 'NOT_FRIENDS':
            SendFriendRequest();
            break;
          case 'REQUESTED':
            //Implement later
            break;
          case 'ACCEPTED':
            RemoveFriend(friendship.id);
            break;
          default:
            console.log('Unexpected friendship status:', friendship.status);
            break;
        }
      };

    return(
        <div>
            <Navbar />
            <div className={styles['user-details']}>
                <ShowUserDetails />
            </div>    
            <div>
                <button onClick={handleButtonClick}>{getButtonText()}</button>
            </div>    
            <div className={styles['posts']}>
                <PostList userId={id} isProfilePage={true}/>
            </div>            
        </div>
    );
}