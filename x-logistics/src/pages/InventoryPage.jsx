import SidebarLayout from "../layouts/SidebarLayout";
import { setAutoToken} from "../jasmin/token";
import Inventory from "../components/inventory/Inventory";

const InventoryPage = () => {
    setAutoToken();

    return (
        <SidebarLayout>
            <Inventory />
        </SidebarLayout>
    )
}


export default InventoryPage;