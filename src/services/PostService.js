import axios from "axios";

const hostname = 'http://localhost:8080'

function savePost(PostItem){
    return axios.post(`${hostname}/posts`, {
        id: 1,
        userId: PostItem.userId,
        content: PostItem.content,
        image: PostItem.image,
        dateTime: PostItem.date
    })
    .then(response => response.data)
}
function getPostsByUserId(userId, page){

    return axios.get(`${hostname}/posts/${userId}?page=${page}`)
    .then(response => response.data)
    .catch(error => {
        console.error("Error fetching posts: ", error);
        throw error;
    });
}

function getFeedPosts(userId, page){
    return axios.get(`${hostname}/posts/feed/${userId}?page=${page}`)
    .then(response => response.data)
    .catch(error => {
        console.error("Error fetching feed posts: ", error);
        throw error; 
    })
}
function getUserPostCount() {
    return axios.get(`${hostname}/posts/statistics`)
    .then(response => response.data);
}


function deletePost(postId, userId) {
    return axios.delete(`${hostname}/posts/${postId}/${userId}`);
}

export default{
    savePost,
    getPostsByUserId,
    getFeedPosts,
    getUserPostCount,
    deletePost
}

