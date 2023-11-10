import React, { useState } from "react";
import FormInput from "../components/FormInputs";
import styles from"./signUpPage.module.css";
import UserService from "../services/UserService";

function SignUpPage () {    
    
    const [errorSavingUser, setErrorSavingUser] = useState(false);

    const addUser = (user) => {
        setErrorSavingUser(false);

        UserService.saveUser(user)
        .then(data => {
            console.log('User created', data); 
        })
        .catch(response => {
            alert(response.code);
        })
        .finally(() => {
            console.log('User Created!');
        });
    };

    const [user,SetUser] = useState({
        name:"",
        email:"",
        password:"",
        confirmPassword: ""
    });

    const inputs = [
        {
            id: 1,
            name: "name",
            type: "text",
            placeholder:"Username",
            errorMessage:"Username should be 3-16 characters and shouldn't include any special characters!",
            label:"Username",
            pattern:"^[a-zA-Z0-9]{3,16}$",
            required: true
        },
        {
            id: 2,
            name: "email",
            type: "email",
            placeholder:"Email",
            errorMessage:"Email address should be valid!",
            label:"Email",
            required: true
        },
        {
            id: 3,
            name: "password",
            type: "password",
            placeholder:"Password",
            errorMessage:"Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
            label:"Password",
            pattern: "^(?=.*[0-9])(?=.*[A-Za-z])(?=.*[@$!%#*?&])[A-Za-z0-9@$#!%*?&]{8,20}$",
            required: true
        },
        {
            id: 4,
            name: "confirmPassword",
            type: "password",
            placeholder:"Confirm Password",
            errorMessage:"Passwords should match!",
            label:"Confirm Password",
            pattern: user.password,
            required: true
        }
    ]

    const handleSubmit = (e) =>{
        e.preventDefault();

        if(user.name.trim() !== "") {
            addUser(user);
            SetUser({
                name: "",
                email: "",
                password: "",
                confirmPassword: "",
            });
            console.log(user);
        }
    };

    const onChange = (e) => {
        SetUser({...user, [e.target.name]: e.target.value});
    }
    
    //Remove later
    console.log(user);

    return(
    <div className="container">
        <form onSubmit={handleSubmit}>
            <h1>Register</h1>
            {inputs.map(input =>(
                <FormInput key={input.id} {...input} value={user[input.name]} onChange={onChange}/>
            ))}  
            <a className={styles['login-link']} href="/LoginPage">Already have an account?</a>          
            <button>Submit</button>
        </form>
    </div>
    )
}
export default SignUpPage;