import React, { useState } from 'react';
import LogoPNG from '../assets/images/LogoPNG.png';
import LogoPNG2 from '../assets/images/Logo2PNG.png';
import styles from "./navbar.module.css";
import {SearchBar} from './SearchBar';
import {SearchResultsList} from './SearchResultsList';
import TokenManager from '../services/TokenManager';

function Navbar () {    
    const [results, setResults] = useState([]);   
    const claims = TokenManager.getClaims();
    const accessToken = TokenManager.getAccessToken(); 

    return(
        <nav className={styles['navbar']}>
            <div className={styles['left-container']}>
                <img src={LogoPNG} alt='Logo' className={styles['logo']}/>
            </div>
            
            <div className={styles['middle-container']}>
                <SearchBar setResults={setResults}/>
                <div className={styles['search-results-container']}>
                    {results && results.filteredSearchUsers && results.filteredSearchUsers.length > 0 && <SearchResultsList results={results.filteredSearchUsers} />}
                </div>
            </div>
            
            <div className={styles['right-container']}>
                <ul className={styles['button-list']}>

                    {accessToken && claims.roles && claims.roles.includes("ADMIN") && (
                        <>
                            <li><a href="/Statistics">Statistics</a></li>
                        </>
                        
                    )}
                    {accessToken && claims.roles && claims.roles.includes("USER") && (
                        <>
                            <li><a href='/Home'>Home</a></li>
                            <li><a href="/Profile">Profile</a></li>
                            <li><a href="/Messages">Messages</a></li>
                        </>
                    )}     
                </ul>            
            </div>
        </nav>
    );
}
export default Navbar;
