import { Button } from "@material-ui/core";
import styles from "./PackagingAction.module.css";

export default function PackagingAction(props) {

    const handleClick = () => {
        if (props.isReady) {
            props.onConfirm();
        }
    }

    return (
        <Button className={props.isReady ? styles.action : styles.disabled} onClick={handleClick}>
            Confirm
        </Button>
    )
}