import axios from "axios";

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

export default{
    saveUser,
}