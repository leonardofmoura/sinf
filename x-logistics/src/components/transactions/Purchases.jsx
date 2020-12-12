import Tabel from "../tabel/Tabel/Tabel.jsx";
import TabelHeader from "../tabel/TabelHeader/TabelHeader.jsx";
import TabelRow from "../tabel/TabelRow/TabelRow.jsx";
import TabelRowSubRow from "../tabel/TabelRowSubRow/TabelRowSubRow.jsx";
import {useEffect, useState} from "react";
import {sendJasminRequest} from "../../jasmin/request";

export default function Purchases() {
	
	const [items, setItems] = useState([]);
	
	const tabelHeaders = ["ID", "Seller", "Date", "Completed"];
	const subTabelHeaders = ["Product ID", "Item Name", "Quantity", "Received Quantity", "Completed"];
	
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
					purchase.documentLines.forEach((product, index) => {
						if (product.itemTypeDescription === "Service") return
						let temp = product.quantity !== product.receivedQuantity
						if (temp)
							completed = false
						subrows.push(<TabelRowSubRow
							data={[product.purchasesItem,
								product.description,
								product.quantity + " (" + product.unit + ")",
								product.receivedQuantity + " (" + product.unit + ")",
								temp ? "No" : "Yes"]}
							key={index}/>)
					})
					if (items.length === 0)
						subrows = <div className="spinner-border" role="status">
							<span className="sr-only">Loading...</span>
						</div>
					return (
						<TabelRow key={index} subHeaders={subTabelHeaders}
											data={[purchase.naturalKey, purchase.sellerSupplierPartyName, date, completed ? "Yes" : "No"]}>
							{subrows}
						</TabelRow>
					)
				})
			}
		</Tabel>
	)
}