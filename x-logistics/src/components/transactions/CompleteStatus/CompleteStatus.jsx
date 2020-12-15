import styles from "./CompleteStatus.module.css";

export default function CompleteStatus(props) {
    
    const renderIcon = () => {
        if (props.isComplete) {
            return <i className="bi bi-check-circle-fill text-success" style={{fontSize:"2.2rem"}} />
        } else {
            return <i className="bi bi-x-circle-fill text-warning" style={{fontSize:"2.2rem"}}/>
        }
    }

    return (
        <div className={styles.section}>
            {renderIcon()}
        </div>
    )
}