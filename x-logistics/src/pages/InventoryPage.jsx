import SidebarLayout from "../layouts/SidebarLayout";
import { setAutoToken} from "../jasmin/token";
import Inventory from "../components/inventory/Inventory";
import WarehousePage from "../components/inventory/WarehousePage";
import TabsLayout from "../layouts/TabsLayout";
import Warehouses from "../components/inventory/Warehouses";

const InventoryPage = () => {
    setAutoToken();

    const tabs = [
        {
            path: '/inventory/list',
            title: 'Inventory',
            component: <Inventory />,
            key: 1
        },
        {
            path: '/inventory/warehouses',
            title: 'Warehouses',
            component: <Warehouses />,
            key: 2
        },
        {
            path: '/inventory/warehouse-page',
            title: 'Warehouse Page (temporary)',
            component: <WarehousePage />,
            key: 3
        },
    ]

    return (
        <SidebarLayout>
            <TabsLayout tabs={tabs}/>
        </SidebarLayout>
    )
}


export default InventoryPage;