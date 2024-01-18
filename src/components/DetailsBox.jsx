import styles from "./detailsBox.module.css";
import React, { useState } from "react";
import UserService from "../services/UserService";

const DetailsBox = ({ id, name, email }) => {

    const [isDisabled, setIsDisabled] = useState(true);
    const [inputName, setInputName] = useState(name || '');
    const [inputEmail, setInputEmail] = useState(email || '');

    const handleModifyClick = () => {
        setIsDisabled(false);
    };
    const handleSubmit = async (e) =>{
        e.preventDefault();

        const newUserDetails = {
            userId: id,
            name: inputName,
            email: inputEmail
        }

        UserService.updateUser(id, newUserDetails);
    };

    return(
        <div>
            <form onSubmit={handleSubmit} className={styles['details-form']}>
                <div className={styles['title']}>
                    <p>Edit details</p>
                </div>
                <div className={styles['inputs-box']}>
                    <input type="text" placeholder="Username"  value={inputName} onChange={(e) => setInputName(e.target.value)} disabled={isDisabled}/>
                    <input type="text" placeholder="Email"  value={inputEmail} onChange={(e) => setInputEmail(e.target.value)} disabled={isDisabled}/>
                </div>
                <div className={styles['buttons-container']}>
                    <button type="button" onClick={handleModifyClick}>
                        Modify
                    </button>
                    <button type="submit" disabled={isDisabled}>   
                        Save
                    </button>
                </div>                
            </form>           
            
        </div>
    );
}
export default DetailsBox