import { useParams } from "react-router-dom";
import DeliveryNote from "../components/sales/DeliveryNote/DeliveryNote";
import { useCookies } from 'react-cookie';
import { Redirect } from "react-router-dom";

const DeliveryNotePage = () => {
    const [cookies, ] = useCookies(['loginState']);
    const { id } = useParams();

    if (cookies.loginState) {
        return <DeliveryNote id={id}/>;
    } else {
        return <Redirect to="/login" />;
    }
}

export default DeliveryNotePage;