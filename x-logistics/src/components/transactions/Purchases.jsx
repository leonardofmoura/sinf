import Table from "../table/Table/Table.jsx";
import TableHeader from "../table/TableHeader/TableHeader.jsx";
import TableRow from "../table/TableRow/TableRow.jsx";
import TableRowSubRow from "../table/TableRowSubRow/TableRowSubRow.jsx";
import {useEffect, useState} from "react";
import {sendJasminRequest} from "../../jasmin/request";
import Loader from "../utils/Loader.jsx";
import CompleteStatus from "./CompleteStatus/CompleteStatus.jsx";

export default function Purchases() {
	
	const [items, setItems] = useState(null);
	
	const tableHeaders = ["ID", "Seller", "Date", "Completed"];
	const subtableHeaders = ["Product ID", "Item Name", "Quantity", "Received Quantity", "Completed"];
	
	useEffect(() => {
		const fetchData = async () => {
			const json = await sendJasminRequest('purchases/orders', 'GET');
			setItems(json.data);
		};
		
		fetchData();
	}, []);

	const renderItems = () => {
		if (items === null) {
			return <Loader/>
		} else if (items.length > 0) {
			return (
				items.map((purchase, index) => {
					let completed = true
					let date = purchase.documentDate.split("T")[0]
					let subrows = [];
					purchase.documentLines.forEach((product, index) => {
						if (product.itemTypeDescription === "Service") return
						let temp = product.quantity === product.receivedQuantity
						if (!temp)
							completed = false
						subrows.push(<TableRowSubRow
							data={[
								product.purchasesItem,
								product.description,
								product.quantity + " (" + product.unit + ")",
								product.receivedQuantity + " (" + product.unit + ")"
							]}
							actionComponent={<CompleteStatus isComplete={temp}/>}
							key={index}/>)
					})
					return (
						<TableRow key={index} subHeaders={subtableHeaders}
							data={[purchase.naturalKey, purchase.sellerSupplierPartyName, date]}
							actionComponent={<CompleteStatus isComplete={completed}/>}
						>			
							{subrows}
						</TableRow>
					)
				})
			)
		} else if (items.length === 0) {
			return (<span>No items found</span>)
		}
	}
	
	return (
		<Table>
			<TableHeader headers={tableHeaders}/>
			{ renderItems() }
		</Table>
	)
}