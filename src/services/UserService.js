import axios from "axios";
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
function getLoggedUserData(id){
    return axios.get(`${hostname}/users/${id}`, id)
}
function getFilterdSearchUsers(username){
    if(username){
        return axios.get(`${hostname}/users/search/${username}`)
            .then(response => response.data)
            .catch(error =>{
                console.error("Error searching for users", error);
            });
    } else {
        return Promise.resolve(null);
    }
    
}

export default{
    saveUser,
    loginUser,
    getLoggedUserData,
    getFilterdSearchUsers
}