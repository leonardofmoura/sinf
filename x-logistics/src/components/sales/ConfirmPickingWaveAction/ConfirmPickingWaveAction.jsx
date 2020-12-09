import { useHistory } from "react-router-dom";
import { confirmPickedProduct } from "../../../jasmin/sales";
import styles from "./ConfirmPickingWaveAction.module.css";

export default function ConfirmPickingWaveAction(props) {
    const history = useHistory();

    const handleClick = async () => {
        let products = props.wave.products;
        for (const key in products) {
            let productInfo = products[key];
            await confirmPickedProduct(productInfo.product, productInfo.quantity);
        }
 
        let storedPickingWaves = localStorage.getItem("picking_waves") ? JSON.parse(localStorage.getItem("picking_waves")) : [];
        storedPickingWaves.splice(storedPickingWaves.indexOf(props.wave), 1);

        localStorage.setItem("picking_waves", JSON.stringify(storedPickingWaves));

        history.push('/sales/pending_packaging');
    }

    return (
        <div className={styles.button} onClick={handleClick}>
            Confirm Picking Wave
        </div>
    )
}