import { Button } from "@material-ui/core";
import styles from "./ConfirmPickingWaveAction.module.css";

export default function ConfirmPickingWaveAction(props) {

    const handleClick = () => {
        props.onAction();
    }

    return (
        <Button className={styles.actionButton} onClick={handleClick}>
            Confirm Picking Wave
        </Button>
    )
}