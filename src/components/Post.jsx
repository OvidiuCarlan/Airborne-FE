import React, { useState } from 'react';
import styles from './post.module.css';
import CommentSection from './CommentSection';
import PostService from '../services/PostService';
import TokenManager from '../services/TokenManager';

function Post({ post }) {
  const { id, userId, content, image, dateTime } = post;
  const [isDeleting, setIsDeleting] = useState(false);
  const claims = TokenManager.getClaims();

  const handleDelete = () => {
    setIsDeleting(true);
    PostService.deletePost(id, userId)
      .then(() => {
        console.log('Post deleted successfully');
      })
      .catch(error => {
        console.error('Error deleting post:', error.response);
      })
      .finally(() => {
        setIsDeleting(false);
      });
  };

  return (
    <div className={styles['post-outline']}>
      <div className={styles['post']}>
        <p className={styles['date']}>{dateTime}</p>
        <h2>{content}</h2>
        {image === '' || image === null ? '' : <img className={styles['post-image']} src={image} />}
        {userId === claims.userId &&(
        <button className={styles['delete-button']} onClick={handleDelete} disabled={isDeleting}>
        {isDeleting ? 'Deleting...' : 'Delete'}
        </button>
        )}
      </div>
      <div className={styles['comments']}>
        <CommentSection postId={post.id} />
      </div>
    </div>
  );
}

export default Post;
