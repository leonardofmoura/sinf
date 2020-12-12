import SidebarLayout from "../layouts/SidebarLayout";
import TabsLayout from "../layouts/TabsLayout";
import Purchases from "../components/transactions/Purchases";
import Sales from "../components/transactions/Sales";

export default function SalesPage() {
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
	]
	return (
		<SidebarLayout>
			<TabsLayout tabs={tabs}/>
		</SidebarLayout>
	)
}