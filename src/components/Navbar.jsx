import LogoPNG from '../assets/images/LogoPNG.png';
import LogoPNG2 from '../assets/images/Logo2PNG.png';
import styles from "./navbar.module.css";

function Navbar () {    
    return(
        <nav className={styles['navbar']}>
            <div className={styles['left-container']}>
                <img src={LogoPNG} alt='Logo' className={styles['logo']}/>
            </div>
            <div className={styles['right-container']}>
            <ul className={styles['button-list']}>
                <li>Home</li>
                <li>Profile</li>
                <li>Info</li>
            </ul>
            </div>
        </nav>
    );
}
export default Navbar;