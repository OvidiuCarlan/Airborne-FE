import { useEffect, useState} from "react";
import Post from "./Post";
import PostService from "../services/PostService";
import styles from "./postList.module.css";
import React, { useRef } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';


function PostList ({userId, isProfilePage}) {    

    const [postItems, setPostItems] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const containerRef = useRef(null);
    const [page, setPage] = useState(0);


    
    const getPostList = async () =>{
    setIsLoading(true);
    setError(null);
   
    let nextPage = page + 1;
    let response;

    try {
        if(isProfilePage){
            response = await PostService.getPostsByUserId(userId, page);
        }
        else{
            response = await PostService.getFeedPosts(userId, page);
        }
        console.log("POSTS::", response);

        const uniquePosts = response.posts.filter(newPost => (
            !postItems.some(existingPost => existingPost.id === newPost.id)
        ));

        setPostItems(prevItems => [...prevItems, ...uniquePosts]);
        setPage(nextPage);
        console.log("Page::", page);

    } catch (error){
        setError(error);
    } finally {
        setIsLoading(false);
    }
    
}

    // const scrollTreshold = () => {
    //     const newPage = page + 1;
    //     setPage(newPage)
    // };

    useEffect(() => {
        getPostList();
    }, [userId]);

    return(
        <div className={styles['post-list']} ref={containerRef}>
            <InfiniteScroll
                className={styles['infinite-scroll']}
                style={{ width: '100%' }}
                dataLength={postItems.length}
                next={getPostList}
                hasMore={!isLoading}
                loader={<h4>Loading...</h4>}
                endMessage={
                    <p style={{ textAlign: 'center' }}>
                        <b>You have seen it all</b>
                    </p>
                }
            >
                <ul>
                    {postItems.map(post => (
                        <Post key={post.id} post={post} />
                    ))}
                </ul>
            </InfiniteScroll>
            {error && <p>Error: {error.message}</p>}
        </div>
    );
}
export default PostList; 