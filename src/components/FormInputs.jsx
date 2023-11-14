import { useState } from "react";
import styles from "./formInput.module.css"

const FormInput = (props) =>{

    const [focused, setFocused] = useState(false);
    const {label, errorMessage, onChange, id, ...inputProps} = props;

    const handleFocus = (e) =>{
        setFocused(true);
    };
    return (
        <div className={styles['input-field']}>
            <label>{label}</label>
            <input {...inputProps} onChange={onChange} onBlur={handleFocus} focused={focused.toString()}/>
            <span>{errorMessage}</span>
        </div>
    )
}
export default FormInput
