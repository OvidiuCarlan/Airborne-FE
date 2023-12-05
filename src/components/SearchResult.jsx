import React from 'react';
import { Link } from 'react-router-dom';
import styles from './searchResult.module.css';

export const SearchResult = ({ result }) => {   

    
    return (       
        <Link to={`/UserProfilePage/${result.id}`} className={styles['search-result']}>
            <h1>{result.name}</h1>            
        </Link>
    );
};