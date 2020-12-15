import Table from "../table/Table/Table"
import TableHeader from "../table/TableHeader/TableHeader"
import TableRowSubRow from "../table/TableRowSubRow/TableRowSubRow"
import TableRow from "../table/TableRow/TableRow"
import Loader from "../utils/Loader";
import {Component} from "react";
import {reorder} from "../../utils/reoder";

class InternalsTable extends Component {
	constructor(props) {
		super(props);
		this.state = {}
		this.items = []
		this.tableHeaders = ["ID", "Source Shelf", "Target Shelf", "Date"]
		this.subtableHeaders = ["Product ID", "Item Name", "Quantity"]
		this.lastTarget = "naturalKey"
		this.reversed = false
	}
	
	reorder = (target) => {
		if (this.lastTarget === target)
			this.reversed = !this.reversed
		const sorted = reorder(target, this.items, this.reversed)
		this.lastTarget = target //used for reverting order if clicked twice in succession
		this.items = sorted
		this.setState({})
	}
	
	render() {
		if (this.items.length !== this.props.items.length) this.items = reorder(this.lastTarget,this.props.items,this.reversed)
		
		if (this.items.length === 0) {
			return (<Loader/>)
		}
		return (
			<Table>
				<TableHeader headers={this.tableHeaders} parent={this}
										 reorderProperties={["naturalKey", "sourceWarehouse", "targetWarehouse", "documentDate"]}
										 orderSelected={[this.reversed, this.lastTarget]}/>
				{
					this.items.map((transaction, index) => {
						let date = transaction.documentDate.split("T")[0]//.split("-")
						return (
							<TableRow key={index} subHeaders={this.subtableHeaders}
												data={[transaction.naturalKey, transaction.sourceWarehouse, transaction.targetWarehouse, date]}>
								{transaction.documentLines.map((product, index) => {
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
}

export default InternalsTable