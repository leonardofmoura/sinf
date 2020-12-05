import styles from "./Login.module.css";

export default function Login(props) {
    return (
        <div className={styles.loginSection}>
            <button className={styles.loginButton} onClick={props.onClick}>Log In</button>
        </div>
    )
}
