import styles from '../../styles/button.module.css';
import GitHub from '../Icons/GitHub';

export default function GitHubLogInButton ({onClickHandler}){
    
    return(
        <>
            <button
            className={styles.button}
            onClick={onClickHandler}>
                <GitHub className={styles.githubIcon}/>
                Log in with GitHub
            </button>
            
        </>
    )
}