import Tabel from "../tabel/Tabel/Tabel.jsx";
import TabelHeader from "../tabel/TabelHeader/TabelHeader.jsx";
import TabelRow from "../tabel/TabelRow/TabelRow.jsx";
import TabelRowSubRow from "../tabel/TabelRowSubRow/TabelRowSubRow.jsx";
import {useEffect, useState} from "react";
import {sendJasminRequest} from "../../jasmin/request";

export default function Sales() {
	
	const [items, setItems] = useState([]);
	
	const tabelHeaders = ["ID", "Customer", "Date", "Completed"];
	const subTabelHeaders = ["Product ID", "Item Name", "Quantity", "Delivered Quantity", "Completed"];
	
	useEffect(() => {
		const fetchData = async () => {
			const json = await sendJasminRequest('sales/orders', 'GET');
			setItems(json.data);
		};
		
		fetchData();
	}, []);
	
	if (items.length === 0) {
		console.log('Returning loader');
		return (<div className="d-flex justify-content-center mt-5">
			<div className="spinner-border" style={{width: "15rem", height: "15rem", }} role="status">
				<span className="sr-only">Loading...</span>
			</div>
		</div>)
	}
	
	return (
		<Tabel>
			<TabelHeader headers={tabelHeaders}/>
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
						subrows.push(<TabelRowSubRow
							data={[product.salesItem,
								product.description,
								product.quantity + " (" + product.unit + ")", product.deliveredQuantity + " (" + product.unit + ")",
								temp ? "No" : "Yes"]}
							key={index}/>)
					})
					return (
						<TabelRow key={index} subHeaders={subTabelHeaders}
											data={[sale.naturalKey, sale.buyerCustomerPartyName, date, completed ? "Yes" : "No"]}>
							{subrows}
						</TabelRow>
					)
				})
			}
		</Tabel>
	)
}