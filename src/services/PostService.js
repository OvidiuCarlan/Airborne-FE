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
export default{
    savePost,
    getPostsByUserId,
}

