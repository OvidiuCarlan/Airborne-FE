import { useEffect, useState} from "react";
import Post from "./Post";
import PostService from "../services/PostService";
import styles from "./postList.module.css";
import React, { useRef } from 'react';


function PostList ({userId}) {    

    const [postItems, setPostItems] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const containerRef = useRef(null);
    const [page, setPage] = useState(0);
    const postsPerPage = 10;


    
    const getPostList = async () =>{
        setIsLoading(true);
        setError(null);
       
        try {
            const response = await PostService.getPostsByUserId(userId, page);
            console.log("POSTS::", response);
            setPostItems(prevItems => [...prevItems, ...response.posts]);
            setPage(prevPage => prevPage + 1);
            console.log("Page::", page);

        } catch (error){
            setError(error);
        } finally {
            setIsLoading(false);
        }
        
    }   

    const handleScroll = () =>{
        if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || isLoading) {
            return;
          }
          getPostList();
    }   

    useEffect(() => {
        getPostList();
    }, [userId]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
      }, [isLoading]);

    return(
        <div className={styles['post-list']} ref={containerRef}>
            <ul>
                {postItems.map(post => (
                    <Post key={post.id} post={post}/>
                ))}
            </ul>
            {isLoading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}
        </div>
    );
}
export default PostList; 