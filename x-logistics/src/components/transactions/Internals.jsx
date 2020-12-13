import TabsLayout from "../../layouts/TabsLayout";
import InternalsTable from "./InternalsTable";
import {sendJasminRequest} from "../../jasmin/request";
import {useEffect, useState} from "react";

export default function Internals() {
	const [items, setItems] = useState([[], [], []]);
	
	useEffect(() => {
		const fetchData = async () => {
			let receptions = [],
				shipping = [],
				shelves = []
			const json = await sendJasminRequest('materialsmanagement/stockTransferOrders', 'GET')
			json.data.forEach(item => {
				if (item.sourceWarehouse === "RECEPTION") receptions.push(item)
				else if (item.targetWarehouse === "SHIPPING") shipping.push(item)
				else shelves.push(item)
			})
			setItems([receptions, shipping, shelves])
		}
		fetchData();
	})
	
	const tabs = [
		{
			path: '/transactions/internals/receptions',
			title: 'Receptions',
			component: <InternalsTable items={items[0]}/>,
			key: 1
		},
		{
			path: '/transactions/internals/shipping',
			title: 'Shipping',
			component: <InternalsTable items={items[1]}/>,
			key: 2
		},
		{
			path: '/transactions/internals/shelves',
			title: 'Between shelves',
			component: <InternalsTable items={items[2]}/>,
			key: 3
		}
	]
	return (
		<TabsLayout tabs={tabs}/>
	)
}