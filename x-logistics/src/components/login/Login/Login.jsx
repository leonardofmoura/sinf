import styles from "./Login.module.css";
import { companyName } from "../../../jasmin/companyInfo";

export default function Login(props) {
    return (
        <div className={styles.loginSection}>
            <div className={styles.loginMessage}>Log In to your company</div>
            <div className={styles.loginCard}>
                <div>Logistics Management</div>
                <button className={styles.companyCard} onClick={props.onClick}>{companyName}</button>
            </div>
        </div>
    )
}
