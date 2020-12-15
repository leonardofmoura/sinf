import Table from "../table/Table/Table.jsx";
import TableHeader from "../table/TableHeader/TableHeader.jsx";
import TableRow from "../table/TableRow/TableRow.jsx";
import TableRowSubRow from "../table/TableRowSubRow/TableRowSubRow.jsx";
import {Component} from "react";
import {sendJasminRequest} from "../../jasmin/request";
import Loader from "../utils/Loader.jsx";
import CompleteStatus from "./CompleteStatus/CompleteStatus.jsx";

class Sales extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			items: null,
		}
		this.tableHeaders = ["ID", "Customer", "Date", "Completed"];
		this.subtableHeaders = ["Product ID", "Item Name", "Quantity", "Delivered Quantity", "Completed"];
		this.lastTarget = ""
		this.reversed = false
	}
	
	fetchData = async () => {
		const json = await sendJasminRequest('sales/orders', 'GET');
		return json.data
	};
	
	componentDidMount() {
		this.fetchData().then(response => {
			this.setState({
				items: response,
			})
		})
	}
	
	renderItems = () => {
		if (this.state.items === null) {
			return <Loader/>
		} else if (this.state.items.length > 0) {
			return (
				this.state.items.map((sale, index) => {
					let completed = true
					let date = sale.documentDate.split("T")[0]
					let subrows = []
					sale.documentLines.forEach((product, index) => {
						if (product.itemTypeDescription === "Service") return
						let temp = product.quantity === product.deliveredQuantity
						if (!temp)
							completed = false
						subrows.push(<TableRowSubRow
							data={[
								product.salesItem,
								product.description,
								product.quantity + " (" + product.unit + ")", product.deliveredQuantity + " (" + product.unit + ")"
							]}
							actionComponent={<CompleteStatus isComplete={temp}/>}
							key={index}/>)
					})
					return (
						<TableRow key={index} subHeaders={this.subtableHeaders}
											data={[sale.naturalKey, sale.buyerCustomerPartyName, date]}
											actionComponent={<CompleteStatus isComplete={completed}/>}>
							{subrows}
						</TableRow>
					)
				})
			)
		} else if (this.state.items.length === 0) {
			return (<spans>No items found</spans>)
		}
	}
	reorder = (target) => {
		if (this.lastTarget === target)
			this.reversed = !this.reversed
		const sorted = [...this.state.items].sort((a, b) => {
			if (this.reversed) {
				if (a[target] < b[target])
					return -1
				if (a[target] > b[target])
					return 1
			} else {
				if (a[target] < b[target])
					return 1
				if (a[target] > b[target])
					return -1
			}
			return 0
		})
		this.lastTarget = target //used for reverting order if clicked twice in succession
		this.setState({items: sorted})
	}
	render() {
		return (
			<Table>
				<TableHeader headers={this.tableHeaders} parent={this}
										 reorderProperties={["naturalKey", "buyerCustomerPartyName", "documentDate"]}
										 orderSelected={[this.reversed, this.lastTarget]}/>
				{this.renderItems()}
			</Table>
		)
	}
}
export default Sales