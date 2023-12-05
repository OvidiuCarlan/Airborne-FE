import React from 'react';
import styles from './searchResult.module.css';

export const SearchResult = ({ result }) => {   

    return (
        <div className={styles['search-result']}>
            <h1>{result.name}</h1>            
        </div>
    );
};