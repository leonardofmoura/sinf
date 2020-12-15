import styles from "./ConfirmPickingWaveAction.module.css";

export default function ConfirmPickingWaveAction(props) {

    const handleClick = () => {
        props.onAction();
    }

    return (
        <div className={styles.button} onClick={handleClick}>
            Confirm Picking Wave
        </div>
    )
}