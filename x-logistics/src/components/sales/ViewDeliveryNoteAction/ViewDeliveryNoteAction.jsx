import { Link } from "react-router-dom";
import styles from "./ViewDeliveryNoteAction.module.css";

export default function ViewDeliveryNoteAction(props) {
    return (
        <Link to={`/delivery_note/${props.id}`} className={styles.action}>
            View Delivery Note
        </Link>
    )
}