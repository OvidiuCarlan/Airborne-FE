function LoginItem(props){
    return(
        <li>            
            <p>Email: {props.user.email}</p>
            <p>Password: {props.user.password}</p>
        </li>
    )
}
export default LoginItem;