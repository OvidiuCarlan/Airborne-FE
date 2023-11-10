import React, { useState } from "react";
import FormInput from "../components/FormInputs";
import styles from"./loginPage.module.css";

function LoginPage () {
    const [values, SetValues] = useState({
        username:"",
        password:""
    });

    const inputs = [
        {
            id: 1,
            name: "username",
            type: "text",
            placeholder: "Username",
            errorMessage: "",
            label: "Username",
            required: true
        },
        {
            id: 2,
            name: "password",
            type: "password",
            placeholder: "Password",
            errorMessage: "",
            label: "Password",
            required: true
        }
    ]

    const handleSubmit = (e) =>{
        e.preventDefault();
    };

    const onChange = (e) =>{
        SetValues({...values, [e.target.name]:e.target.value});
    }
    
    //Remove later
    console.log(values);

    return(
        <div className="container">
            <form onSubmit={handleSubmit}>
                <h1>Log In</h1>
                {inputs.map(input =>(
                    <FormInput key={input.id} {...input} value={values[input.name]} onChange={onChange}/>
                ))}
            <a className={styles['signup-link']} href="/SignUpPage">Create an account.</a>          
            <button>Submit</button>
            </form>
        </div>
    )
}
export default LoginPage;