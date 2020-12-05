import styles from "./ProductStatus.module.css";

export default function ProductStatus(props) {
    return (
        <div className={props.isReady ? styles.ready : styles.notReady}>
            {props.isReady ? "Picked" : "Pending Picking"}
        </div>
    )
}