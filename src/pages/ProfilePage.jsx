import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import TokenManager from "../services/TokenManager";
import UserService from "../services/UserService";
import UserDetails from "../components/UserDetails";

function ProfilePage() {
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
        } else {
            console.log("Condition is false, not fetching user details.");
        }
    }

    useEffect(() => {
        getUserDetails();
    }, []);


    const ShowUserDetails = () => {
        if (!user) {
            return <>Loading...</>
        }
        return (
            <UserDetails userDetails={user} />
        );
    }

    return (
        <div>
            <Navbar />
            <h1>Profile Page</h1>
            <ShowUserDetails />
        </div>
    );
}
export default ProfilePage;
