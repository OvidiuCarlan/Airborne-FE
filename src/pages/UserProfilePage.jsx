import UserDetails from "../components/UserDetails";
import PostList from "../components/PostList";
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import styles from "./profilePage.module.css";
import Navbar from "../components/Navbar";
import UserService from "../services/UserService";
import PostService from "../services/PostService";

export function UserProfilePage(props){

    const [user, setUser] = useState();
    const {id} = useParams();

    
    const getUserDetails = () => {
        UserService.getLoggedUserData(id)
                .then(userDetails => {
                    console.log("User details received:", userDetails);
                    setUser(userDetails);
                    if (userDetails && typeof userDetails === 'object') {
                        console.log("Setting user details:", userDetails);
                        setUser(userDetails);
                    } else {
                        console.error("Invalid user details format or missing data:", userDetails);
                        setUser(null);
                    }
                })
                .catch(error => {
                    console.error("Error fetching user details:", error);
                });
    }

    useEffect(() => {
        getUserDetails();
        console.log(user);
    }, [id]);

    const ShowUserDetails = () => {
        if (!user) {
            return <>Loading...</>
        }
        return (
            <UserDetails userDetails={user} />
        );
    }

    return(
        <div>
            <Navbar />
            <div className={styles['user-details']}>
                <ShowUserDetails />
            </div>        
            <div className={styles['posts']}>
                <PostList userId={id} />
            </div>            
        </div>
    );
}