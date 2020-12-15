import SidebarLayout from "../layouts/SidebarLayout";
import Inventory from "../components/inventory/Inventory";
import TabsLayout from "../layouts/TabsLayout";
import Warehouses from "../components/inventory/Warehouses";
import WarehousePage from "./WarehousePage";
import { useCookies } from 'react-cookie';
import { Redirect } from "react-router-dom";

const InventoryPage = () => {

	const [cookies, ] = useCookies(['loginState']);
	
	const tabs = [
		{
			path: '/inventory/list',
			title: 'Inventory',
			component: <Inventory/>,
			key: 1
		},
		{
			path: '/inventory/warehouse',
			title: 'Warehouse',
			component: <Warehouses/>,
			key: 2
		},
	]
	
	const extraRoutes = [
		{
			path: '/inventory/section/:id',
			component: <WarehousePage/>,
			key: 3,
		}
	]

	if (cookies.loginState) {
        return (
			<SidebarLayout>
				<TabsLayout tabs={tabs} extraRoutes={extraRoutes}/>
			</SidebarLayout>
		)
    } else {
        return <Redirect to="/login" />;
    }
}


export default InventoryPage;