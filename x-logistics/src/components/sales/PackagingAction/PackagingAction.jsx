import styles from "./PackagingAction.module.css";

export default function PackagingAction(props) {

    const handleClick = () => {
        if (props.isReady) {
            props.onConfirm();
        }
    }

    return (
        <div className={props.isReady ? styles.confirm : styles.disabled} onClick={handleClick}>
            Confirm
        </div>
    )
}