import { useParams } from "react-router-dom";
import DeliveryNote from "../components/sales/DeliveryNote/DeliveryNote";

const DeliveryNotePage = () => {
    const {id} = useParams();

    return (
        <DeliveryNote id={id}/>
    )
}

export default DeliveryNotePage;