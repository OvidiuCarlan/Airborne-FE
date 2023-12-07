import axios from "axios";

const hostname = 'http://localhost:8080'

function addFriend(senderId, recipientId){
    return axios.post(`${hostname}/friendships`, {
        senderId: senderId,
        recipientId: recipientId
    })
    .then(response => response.data)
}
function checkFriendship(loggedInUserId, otherUserId){
    return axios.get(`${hostname}/friendships/check/${loggedInUserId}/${otherUserId}`, {
        params: {
            loggedInUserId: loggedInUserId,
            otherUserId: otherUserId
        }
    })
    .then(response => response.data)    
    .catch(err => {
        console.log("Friendship relation not found");
    })
}
function deleteFriendship(id){
    return axios.delete(`${hostname}/friendships/delete/${id}`)
        .then(response => {
            console.log('Friendship deleted successfully');
            return response.data;
        })
        .catch(error => {
            console.error('Failed to delete friendship:', error);
            throw error;
        });
}
export default{
    addFriend,
    checkFriendship,
    deleteFriendship,
}