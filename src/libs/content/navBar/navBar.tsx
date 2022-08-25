import { Link } from 'react-router-dom';
import styles from './navBar.module.scss';

export const NavBar = () => {
    return (
        <div className={styles['navBar']}>
            <div className={styles['navBar__section']}>
                <Link to='/'>
                    <div className={styles['navBar__pill']}>
                        Launch Page
                    </div>
                </Link>
                <Link to='/about'>
                    <div className={styles['navBar__pill']}>
                        About
                    </div>
                </Link>
            </div>
        </div>
    );
};