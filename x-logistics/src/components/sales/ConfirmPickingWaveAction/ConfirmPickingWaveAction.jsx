import { useHistory } from "react-router-dom";
import { confirmPickedProduct } from "../../../jasmin/sales";
import styles from "./ConfirmPickingWaveAction.module.css";

export default function ConfirmPickingWaveAction(props) {
    const history = useHistory();

    const handleClick = async () => {
        let products = props.wave.products;
        let isPendingPackaging = false;

        for (const key in products) {
            let product = products[key];

            if (product.saleQuantity <= product.waveQuantity + product.pickedQuantity) {
                isPendingPackaging = true;
            }

            await confirmPickedProduct(product, product.waveQuantity);
        }
 
        let storedPickingWaves = localStorage.getItem("picking_waves") ? JSON.parse(localStorage.getItem("picking_waves")) : [];
        storedPickingWaves.splice(storedPickingWaves.indexOf(props.wave), 1);

        localStorage.setItem("picking_waves", JSON.stringify(storedPickingWaves));

        let redirectUrl = "/sales/" + (isPendingPackaging ? "pending_packaging" : "pending_picking");
        history.push(redirectUrl);
    }

    return (
        <div className={styles.button} onClick={handleClick}>
            Confirm Picking Wave
        </div>
    )
}