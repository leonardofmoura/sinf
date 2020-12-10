import WarehousePageComponent from "./WarehousePageComponent/WarehousePageComponent";
import GoBackButton from "./WarehousePageComponent/GoBackButton";
import { useParams } from "react-router-dom";

const WarehousePage = (props) => {
    const {id} = useParams();
    
    console.log("cona");

    return (
        <div>
            <GoBackButton url={props.url} />
            <WarehousePageComponent id={id}/>
        </div>
    )
}


export default WarehousePage;