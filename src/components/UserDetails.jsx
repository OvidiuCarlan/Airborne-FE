import TokenManager from "../services/TokenManager";

function UserDetails(props) {
    const userDetails = props.userDetails.data;
    const claims = TokenManager.getClaims();
    const id = claims.userId;

    console.log("UserDetails Component - UserDetails:", userDetails);
    console.log("UserDetails Component - Claims:", claims);
    console.log("UserDetails Component - User ID:", id);

    return (
        <div className="user-details-container">
            <p className="user-info">Username: <b>{userDetails.name}</b></p>
            <p className="user-info">Email: <b>{userDetails.email}</b></p>
        </div>
    );
}
export default UserDetails;
