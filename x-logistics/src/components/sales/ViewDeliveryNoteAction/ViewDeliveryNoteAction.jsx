import styles from "./ViewDeliveryNoteAction.module.css";

export default function ViewDeliveryNoteAction(props) {
    return (
        <div className={styles.action} onClick={props.onClick}>
            View Delivery Note
        </div>
    )
}