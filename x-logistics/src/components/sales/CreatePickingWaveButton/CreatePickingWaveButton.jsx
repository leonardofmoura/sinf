import styles from "./CreatePickingWaveButton.module.css";

export default function CreatePickingWaveButton(props) {

    const handleClick = () => {
        props.onClick();
    }

    return (
        <div className={styles.buttonSection}>
            <button className={styles.button} onClick={handleClick}>
                Create Picking Wave
            </button>
        </div>
    )
}