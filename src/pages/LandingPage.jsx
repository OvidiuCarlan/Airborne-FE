import Navbar from "../components/Navbar";
import styles from "./landingPage.module.css";
import TokenManager from "../services/TokenManager";
import UserService from "../services/UserService";
import { useEffect, useState } from "react";
import PostList from "../components/PostList";



function LandingPage (){
    const [user, setUser] = useState();
    const claims = TokenManager.getClaims();

    const getUserDetails = () => {
        if (claims?.roles?.includes('USER') && claims?.userId) {
            console.log("Fetching user details for user id:", claims.userId);

            UserService.getLoggedUserData(claims.userId)
                .then(userDetails => {
                    console.log("User details received:", userDetails);
                    setUser(userDetails);
                    if (userDetails && typeof userDetails === 'object') {
                        setUser(userDetails);
                    } else {
                        console.error("Invalid user details format or missing data:", userDetails);
                        setUser(null);
                    }
                })
                .catch(error => {
                    console.error("Error fetching user details:", error);
                });
        } else {
            console.log("Condition is false, not fetching user details.");
        }
    }
    useEffect(() => {
        getUserDetails();
    }, []);

    return(
        <div>
            <Navbar></Navbar>
            <div className={styles['posts']}>
                <PostList userId={claims?.userId} isProfilePage={false}/>
            </div>
        </div>
        
    );   
}
export default LandingPage;

