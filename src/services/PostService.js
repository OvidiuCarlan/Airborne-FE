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
export default{
    savePost,
}