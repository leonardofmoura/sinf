import WarehousePageComponent from "../components/inventory/WarehousePageComponent/WarehousePageComponent";
import {useParams} from "react-router-dom";
import { useCookies } from 'react-cookie';
import { Redirect } from "react-router-dom";

const WarehousePage = () => {
	const {id} = useParams();
	const [cookies, ] = useCookies(['loginState']);
	
	if (cookies.loginState) {
        return <WarehousePageComponent id={id}/>;
    } else {
        return <Redirect to="/login" />;
    }
}

export default WarehousePage;