import Table from "../table/Table/Table"
import TableHeader from "../table/TableHeader/TableHeader"
import TableRowSubRow from "../table/TableRowSubRow/TableRowSubRow"
import TableRow from "../table/TableRow/TableRow"
import Loader from "../utils/Loader";

export default function InternalsTable(props) {
	const tableHeaders = ["ID", "Source Shelf", "Target Shelf", "Date"]
	const subtableHeaders = ["Product ID", "Item Name", "Quantity"]
	
	if (props.items.length === 0) {
		return (<Loader/>)
	}
	
	return (
		<Table>
			<TableHeader headers={tableHeaders}/>
			{
				props.items.map((transaction, index) => {
					let date = transaction.documentDate.split("T")[0]//.split("-")
					return (
						<TableRow key={index} subHeaders={subtableHeaders}
											data={[transaction.naturalKey, transaction.sourceWarehouse, transaction.targetWarehouse, date]}>
							{transaction.documentLines.map((product, index) => {
								//if (product.itemTypeDescription === "Service") return
								return (<TableRowSubRow
									data={[product.materialsItem,
										product.description,
										product.quantity + " (" + product.unit + ")"]}
									key={index}/>)
							})}
						</TableRow>
					)
				})
			}
		</Table>)
}