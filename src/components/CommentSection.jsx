import styles from "./commentSection.module.css";
import React, { useState } from 'react';
import CommentService from "../services/CommentService";



function CommentSection ({postId, userId}) {    
    const [content, setContent] = useState('');
    const [comment, setComment] = useState({
        postId: postId,
        userId: userId,
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
            setContent('');
         } catch (error){
            console.error('Error creating comment: ', error);
            alert(error.code);
         }
    };


    const handleContentChange = (e) => {
        setContent(e.target.value);
    };
    return(        
        <div className={styles['comments']}>
            <div className={styles['comment-container']}>
                <div className={styles['comment']}>
                    <p className={styles['comment-author']}>John Doe</p>
                    <p className={styles['comment-text']}>This is a great post!</p>
                </div>
                <div className={styles['comment']}>
                    <p className={styles['comment-author']}>Jane Smith</p>
                    <p className={styles['comment-text']}>I really enjoyed reading this!</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className={styles['comment-form']}>
                <textarea value={content} onChange={handleContentChange} className={styles['comment-input']} placeholder=" Your Comment" required></textarea>
                <button className={styles['comment-button']} type="submit">Submit</button>
            </form>
        </div>         
    );
}
export default CommentSection;
