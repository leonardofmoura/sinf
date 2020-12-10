import Tabel from "../tabel/Tabel/Tabel.jsx";
import TabelHeader from "../tabel/TabelHeader/TabelHeader.jsx";
import TabelRow from "../tabel/TabelRow/TabelRow.jsx";
import TabelRowSubRow from "../tabel/TabelRowSubRow/TabelRowSubRow.jsx";
import {useEffect, useState} from "react";
import {sendJasminRequest} from "../../jasmin/request";

export default function Sales() {
	
	const [items, setItems] = useState([]);
	
	const tabelHeaders = ["ID", "Customer", "Date", "Price", "Completed"];
	const subTabelHeaders = ["Product ID", "Item Name", "Price", "Quantity", "Delivered Quantity", "Completed"];
	
	useEffect(() => {
		const fetchData = async () => {
			const json = await sendJasminRequest('sales/orders', 'GET');
			setItems(json.data);
		};
		
		fetchData();
	}, []);
	
	console.log('BEFORE RENDERS:');
	//console.log(items);
	
	if (items.length === 0) {
		console.log('Returning null');
		return null;
	}
	
	return (
		<Tabel>
			<TabelHeader headers={tabelHeaders}/>
			{
				items.map((sale, index) => {
					let completed = true
					let date = sale.documentDate.split("T")[0]//.split("-")
					let subrows = []
					sale.documentLines.map((product, index) => {
						if (product.quantity !== product.deliveredQuantity)
							completed = false
						subrows.push(<TabelRowSubRow
							data={[product.salesItem,
								product.description, product.unitPrice.amount,
								product.quantity, product.deliveredQuantity,
								product.quantity === product.deliveredQuantity ? "Yes" : "No"]}
							key={index}/>)
					})
					return (
						<TabelRow key={index} subHeaders={subTabelHeaders}
											data={[sale.naturalKey, sale.buyerCustomerPartyName, date, sale.payableAmountAmount, completed ? "Yes" : "No"]}>
							{subrows}
						</TabelRow>
					)
				})
			}
		</Tabel>
	)
}