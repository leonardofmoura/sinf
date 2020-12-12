import WarehousePageComponent from "./WarehousePageComponent/WarehousePageComponent";
import { useParams } from "react-router-dom";

const WarehousePage = (props) => {
    const {id} = useParams();

    return (
        <div>
            <WarehousePageComponent id={id}/>
        </div>
    )
}


export default WarehousePage;