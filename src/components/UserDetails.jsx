import TokenManager from "../services/TokenManager";
import styles from "./userDetails.module.css";
import LogoPNG from '../assets/images/LogoPNG.png';
import Avatar from '../assets/images/Avatar.png';

function UserDetails(props) {
    const userDetails = props.userDetails.data;
    const claims = TokenManager.getClaims();
    const id = claims.userId;

    return (
        <div className={styles['user-details-container']}>

            <div className={styles['user-details-top-container']}>

                <div className={styles['avatar-container']}>
                    <img src={Avatar} alt='Logo' className={styles['avatar']}/>
                </div>

                <div className={styles['logo-container']}>
                    <img src={LogoPNG} alt='Logo' className={styles['logo']}/>  
                </div>  

            </div>


            <div className={styles['user-details-bootom-container']}>
                <p className={styles['user-info']}><b>{userDetails.name}</b></p>
                <p className={styles['user-info']}><b>{userDetails.email}</b></p>
            </div>
            
        </div>
    );
}
export default UserDetails;
