import axios from "axios";
import LoginItem from "../components/User/LoginItem";
import TokenManager from "./TokenManager";

const hostname = 'http://localhost:8080'

function saveUser(UserItem){
    return axios.post(`${hostname}/users`, {
        id: 1,
        name: UserItem.name,
        email: UserItem.email,
        password: UserItem.password
    })
        .then(response => response.data)
}

function loginUser(LoginItem){
        return axios.post(`${hostname}/users/tokens`, LoginItem, {
            withCredentials: true,       
            headers: {
                'Access-Control-Allow-Origin': '*'
            }     
        })
        .then(response => {
            if (response.data && response.data.accessToken) {
                const accessToken = response.data.accessToken;
                TokenManager.setAccessToken(accessToken);
                alert("User Logged In");
                window.location.href = '/LandingPage';
            } else {
                alert("Invalid response from the server");
            }
        })
        .catch(err => {
            if (err.response === undefined) {
                alert(err.message);
            } else if (err.response.status === 401) {
                alert('Invalid credentials');
            }
        });    
}
export default{
    saveUser,
    loginUser
}