import SidebarLayout from "../layouts/SidebarLayout";
import TabsLayout from "../layouts/TabsLayout";
import Purchases from "../components/transactions/Purchases";
import Sales from "../components/transactions/Sales";
import Internals from "../components/transactions/Internals";
import {useCookies} from 'react-cookie';
import {Redirect} from "react-router-dom";

export default function SalesPage() {
	const [cookies,] = useCookies(['loginState']);
	
	const tabs = [
		{
			path: '/transactions/purchases',
			title: 'Purchases',
			component: <Purchases/>,
			key: 1
		},
		{
			path: '/transactions/sales',
			title: 'Sales',
			component: <Sales/>,
			key: 2
		},
		{
			path: '/transactions/internals/receptions',
			title: 'Internals',
			component: <Internals/>,
			key: 3
		}
	]
	const extraRoutes = [
		{
			path: '/transactions/internals/shipping',
			component: <Internals/>,
			key: 4,
		},
		{
			path: '/transactions/internals/shelves',
			component: <Internals/>,
			key: 5,
		}
	]
	
	if (cookies.loginState) {
		return (
			<SidebarLayout>
				<TabsLayout tabs={tabs} extraRoutes={extraRoutes}/>
			</SidebarLayout>
		)
	} else {
		return <Redirect to="/login"/>;
	}
}