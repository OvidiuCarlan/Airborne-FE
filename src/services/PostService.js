import axios from "axios";

const hostname = 'http://localhost:8080'

function savePost(PostItem){
    return axios.post(`${hostname}/posts`, {
        id: 1,
        userId: PostItem.userId,
        content: PostItem.content,
        image: PostItem.image
    })
    .then(response => response.data)
}
function getPostsByUserId(id){
    return axios.get(`${hostname}/posts/${id}`)
    .then(response => response.data)
    .catch(error => {
        console.error("Error fetching posts: ", error);
    });
}
export default{
    savePost,
    getPostsByUserId,
}

