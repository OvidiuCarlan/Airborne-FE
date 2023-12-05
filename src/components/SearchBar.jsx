import React, { useState } from 'react';
import styles from './searchBar.module.css';
import UserService from '../services/UserService';

export const SearchBar = ({ setResults }) => {
    const [input, setInput] = useState("");

    const fetchData = async (value) => {
        try {
            const filteredUsers = await UserService.getFilterdSearchUsers(value);
            setResults(filteredUsers);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const handleChange = (value) => {
        setInput(value);
        console.log(value)
        fetchData(value.trim());
    }

    return (
        <div className={styles['search-container']}>
            <input
                type="text"
                placeholder="Type to search..."
                className={styles['search-bar']}
                value={input}
                onChange={(e) => handleChange(e.target.value)}
            />
        </div>
    );
};
