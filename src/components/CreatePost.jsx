import React, { useState } from 'react';
import styles from "./createPost.module.css";
import { RiFileUploadLine } from "react-icons/ri";
import PostService from "../services/PostService";


const CreatePost = ({ userId }) =>{

    const [content, setContent] = useState('');
    const [image, setImage] = useState('');
    const date = new Date(); 

    const [post, SetPost] = useState({
        userId: userId ? userId : '',
        content: "",
        image: "",
        date: ''
    });

    const currentDate = new Intl.DateTimeFormat('en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: false,
    }).format(date);

    const addPost = (post) =>{

        PostService.savePost(post)
        .then(data => {
            console.log('Post created', data);
        })
        .catch(response =>{
            alert(response.code);
        })
        .finally(() => {
            console.log('Post Created!', post);
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const post = {
            userId: userId || '',
            content: content,
            image: image,
            date: currentDate
        };

        try {
            await addPost(post);
            console.log('Post created:', post);
            setContent('');
            setImage('');
        } catch (error) {
            console.error('Error creating post:', error);
            alert(error.code);
        }
    };
    
    function convertToBase64(e) {
        console.log(e);
        var reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
            console.log(reader.result);
            setImage(reader.result);
        };
        reader.onerror = error => {
            console.log("Error: ", error);
        };
    }

    const handleContentChange = (e) => {
        setContent(e.target.value);
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    return(
        <div className={styles['post-container']}>
            <h2>Create New Post</h2>
            <form onSubmit={handleSubmit}>
                <div className={styles['caption-input']}>
                    <textarea id="content" value={content} onChange={handleContentChange} placeholder='Write a cool caption for your new post!'/>
                </div>
                <div className={styles['picture-input']}>
                    <label className={styles['upload']} htmlFor="image">  Upload Image:</label>
                    <input type='file' id='image' accept='image/*' multiple={false} onChange={convertToBase64}/>
                    <button className={styles['create-post-button']} type="submit">Create Post</button>
                </div>
            </form>
        </div>
    );
}
export default CreatePost