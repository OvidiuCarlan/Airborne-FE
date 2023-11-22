import React, { useState } from 'react';
import styles from "./createPost.module.css";
import { RiFileUploadLine } from "react-icons/ri";


const CreatePost = () =>{

    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);
    
    const handleSubmit = (event) => {
        event.preventDefault();

        console.log('Content:', content);
        console.log('Image:', image);

        setContent('');
        setImage(null);
    }

    const handleContentChange = (event) => {
        setContent(event.target.value);
    };

    return(
        <div className={styles['post-container']}>
            <h2>Create New Post</h2>
            <form onSubmit={handleSubmit}>
                <div className={styles['caption-input']}>
                    <textarea id="content" value={content} onChange={handleContentChange} placeholder='Write a cool caption for your new post!'/>
                </div>
                <div className={styles['picture-input']}>
                    <label className={styles['upload']} htmlFor="image"><RiFileUploadLine />  Upload Image:</label>
                    <input type='file' id='image' accept='image/*' multiple={false}/>
                    <button className={styles['create-post-button']} type="submit">Create Post</button>
                </div>
            </form>
        </div>
    );
}
export default CreatePost