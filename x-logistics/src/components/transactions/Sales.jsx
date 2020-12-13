import Table from "../table/Table/Table.jsx";
import TableHeader from "../table/TableHeader/TableHeader.jsx";
import TableRow from "../table/TableRow/TableRow.jsx";
import TableRowSubRow from "../table/TableRowSubRow/TableRowSubRow.jsx";
import {useEffect, useState} from "react";
import {sendJasminRequest} from "../../jasmin/request";
import Loader from "../utils/Loader.jsx";

export default function Sales() {
	
	const [items, setItems] = useState([]);
	
	const tableHeaders = ["ID", "Customer", "Date", "Completed"];
	const subtableHeaders = ["Product ID", "Item Name", "Quantity", "Delivered Quantity", "Completed"];
	
	useEffect(() => {
		const fetchData = async () => {
			const json = await sendJasminRequest('sales/orders', 'GET');
			setItems(json.data);
		};
		
		fetchData();
	}, []);
	
	if (items.length === 0) {
		return ( <Loader/> )
	}
	
	return (
		<Table>
			<TableHeader headers={tableHeaders}/>
			{
				items.map((sale, index) => {
					let completed = true
					let date = sale.documentDate.split("T")[0]//.split("-")
					let subrows = []
					sale.documentLines.forEach((product, index) => {
						if (product.itemTypeDescription === "Service") return
						let temp = product.quantity !== product.deliveredQuantity
						if (temp)
							completed = false
						subrows.push(<TableRowSubRow
							data={[product.salesItem,
								product.description,
								product.quantity + " (" + product.unit + ")", product.deliveredQuantity + " (" + product.unit + ")",
								temp ? "No" : "Yes"]}
							key={index}/>)
					})
					return (
						<TableRow key={index} subHeaders={subtableHeaders}
											data={[sale.naturalKey, sale.buyerCustomerPartyName, date, completed ? "Yes" : "No"]}>
							{subrows}
						</TableRow>
					)
				})
			}
		</Table>
	)
}