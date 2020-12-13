import SidebarLayout from "../layouts/SidebarLayout";
import Inventory from "../components/inventory/Inventory";
import TabsLayout from "../layouts/TabsLayout";
import Warehouses from "../components/inventory/Warehouses";
import WarehousePage from "./WarehousePage";

const InventoryPage = () => {
	
	const tabs = [
		{
			path: '/inventory/list',
			title: 'Inventory',
			component: <Inventory/>,
			key: 1
		},
		{
			path: '/inventory/warehouses',
			title: 'Warehouses',
			component: <Warehouses/>,
			key: 2
		},
	]
	
	const extraRoutes = [
		{
			path: '/inventory/warehouse/:id',
			component: <WarehousePage/>,
			key: 3,
		}
	]
	
	return (
		<SidebarLayout>
			<TabsLayout tabs={tabs} extraRoutes={extraRoutes}/>
		</SidebarLayout>
	)
}


export default InventoryPage;