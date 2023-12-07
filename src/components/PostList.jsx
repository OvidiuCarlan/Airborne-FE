import { useEffect, useState } from "react";
import Post from "./Post";
import PostService from "../services/PostService";
import styles from "./postList.module.css";

function PostList ({userId}) {    

    const [postItems, setPostItems] = useState([]);

    const getPostList = () => {
        PostService.getPostsByUserId(userId)
            .then((posts) => {
                setPostItems(posts.posts);
                console.log('Retrieved posts:', posts)
            })
            .catch((error) => console.error('Error fetching posts:', error));
    };

    useEffect(() =>{
        getPostList();
    }, [userId]);

    function displayPosts(postItems) {
        return postItems.map(post => (
            <Post key={post.id} post={post}/>
        ))
    }


    return(
        <div className={styles['post-list']}>
            {postItems.length > 0 ? displayPosts(postItems) : <p>Loading...</p>}
        </div>
    );
}
export default PostList; 