import React from "react";

function UserItem(props){
    return(
        <li>
            <p>User ID: {props.user.id}</p>
            <p>Username: {props.user.name}</p>
            <p>Email: {props.user.email}</p>
            <p>Password: {props.user.password}</p>
            <p>-----------</p>
        </li>
    )
}
export default UserItem;