import WarehousePageComponent from "../components/inventory/WarehousePageComponent/WarehousePageComponent";
import SidebarLayout from "../layouts/SidebarLayout";
import { useParams } from "react-router-dom";

const WarehousePage = () => {
    const {id} = useParams();

    return (
        <WarehousePageComponent id={id}/>
    )
}

export default WarehousePage;