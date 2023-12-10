import axios from "axios";

const hostname = 'http://localhost:8080'

function saveComment(CommentItem){
    return axios.post(`${hostname}/comments/save`, {
        postId: CommentItem.postId,
        userId: CommentItem.userId,
        content: CommentItem.content,
        dateTime: CommentItem.dateTime
    })
    .then(response => response.data)
}
function getCommentSection(postId){
    return axios.get(`${hostname}/comments/${postId}`)
    .then(response => response.data)
    .catch(error => {
        console.log("Error fetching comments: ", error)
        throw error;
    });
}


export default{
    saveComment,
    getCommentSection
}