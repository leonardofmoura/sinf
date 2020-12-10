import Tabel from "../tabel/Tabel/Tabel.jsx";
import TabelHeader from "../tabel/TabelHeader/TabelHeader.jsx";
import TabelRow from "../tabel/TabelRow/TabelRow.jsx";
import TabelRowSubRow from "../tabel/TabelRowSubRow/TabelRowSubRow.jsx";
import {useEffect, useState} from "react";
import {sendJasminRequest} from "../../jasmin/request";

export default function Purchases() {
	
	const [items, setItems] = useState([]);
	
	const tabelHeaders = ["ID", "Seller", "Date", "Price", "Completed"];
	const subTabelHeaders = ["Product ID", "Item Name", "Price", "Quantity", "Received Quantity", "Completed"];
	
	useEffect(() => {
		const fetchData = async () => {
			const json = await sendJasminRequest('purchases/orders', 'GET');
			setItems(json.data);
		};
		
		fetchData();
	}, []);
	
	if (items.length === 0) {
		console.log('Returning null');
		return null;
	}
	
	return (
		<Tabel>
			<TabelHeader headers={tabelHeaders}/>
			{
				items.map((purchase, index) => {
					let completed = true
					let date = purchase.documentDate.split("T")[0]//.split("-")
					let subrows = []
					purchase.documentLines.map((product, index) => {
						let temp = product.quantity !== product.receivedQuantity && product.itemTypeDescription !== "Service"
						if (temp)
							completed = false
						subrows.push(<TabelRowSubRow
							data={[product.purchasesItem,
								product.description, product.unitPrice.amount,
								product.quantity, product.itemTypeDescription !== "Service" ? product.receivedQuantity : "Na",
								temp ? "No" : "Yes"]}
							key={index}/>)
					})
					return (
						<TabelRow key={index} subHeaders={subTabelHeaders}
											data={[purchase.naturalKey, purchase.sellerSupplierPartyName, date, purchase.payableAmount.amount, completed ? "Yes" : "No"]}>
							{subrows}
						</TabelRow>
					)
				})
			}
		</Tabel>
	)
}