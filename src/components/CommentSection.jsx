import styles from "./commentSection.module.css";
import React, { useEffect, useState } from 'react';
import CommentService from "../services/CommentService";
import Comment from "./Comment";
import TokenManager from "../services/TokenManager";


function CommentSection ({postId}) {    
    const [content, setContent] = useState('');
    const claims = TokenManager.getClaims();
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState({
        postId: postId,
        userId: claims?.userId,
        content: ""
    });

    const addComment = (comment) =>{
        CommentService.saveComment(comment)
        .then(data => {
            console.log('Comment created', data);
        })
        .catch(response => {
            alert(response.code);
        })
        .finally(() => {
            console.log('Comment Created! ', comment);
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const updatedComment = {
            ...comment,
            content: content
        };
         try{
            await addComment(updatedComment);
            console.log('Comment created: ', updatedComment);
            setComments([...comments, updatedComment]);
            setContent('');
         } catch (error){
            console.error('Error creating comment: ', error);
            alert(error.code);
         }
    };


    const handleContentChange = (e) => {
        setContent(e.target.value);
    };

    const getComments = async () => {
        try {
            const comments = await CommentService.getCommentSection(postId);
            console.log("Comments received: ", comments);
            setComments(comments.comments);
        } catch (error) {
            console.error("Error fetching comments", error);
        }
    };

    useEffect(() => {
        getComments();
    }, []);

    const ShowComments = ({ comments }) => {
        if(!Array.isArray(comments)){
            return <p className={styles['no-comments']}>No comments yet.</p>
        }
        return (
            <ul>
                {comments.map(comment =>(
                    <Comment key={comment.id} comment={comment}/>
                ))} 
            </ul>
           
        );
    }

    return(        
        <div className={styles['comments']}>
            <div className={styles['comment-container']}>
                <ShowComments comments={comments}/>
            </div>

            <form onSubmit={handleSubmit} className={styles['comment-form']}>
                <textarea value={content} onChange={handleContentChange} className={styles['comment-input']} placeholder=" Your Comment" required></textarea>
                <button className={styles['comment-button']} type="submit">Submit</button>
            </form>
        </div>         
    );
}
export default CommentSection;
