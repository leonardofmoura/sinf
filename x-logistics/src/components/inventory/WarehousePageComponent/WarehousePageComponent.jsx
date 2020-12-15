import WarehouseHeader from "../WarehouseHeader/WarehouseHeader";
import Table from "../../table/Table/Table.jsx";
import TableHeader from "../../table/TableHeader/TableHeader.jsx";
import TableRow from "../../table/TableRow/TableRow.jsx";
import {Component} from "react";
import {getWarehouseItems} from "../../../jasmin/inventory";
import 'reactjs-popup/dist/index.css';
import Loader from '../../utils/Loader';
import ItemsStoragePopup from './ItemsStoragePopup/ItemsStoragePopup';
import {reorder} from "../../../utils/reoder";

class WarehousePageComponent extends Component {
	constructor(props) {
		super(props);
		
		this.tableHeaders = ["ID", "Item Name", "Quantity", "Category", "Action"];
		
		this.state = {
			warehouse: null,
		}
		this.lastTarget = 0
		this.reversed = true
	}
	
	componentDidMount() {
		getWarehouseItems(this.props.id).then((resp) => {
			const items = resp.items.map((item) => {
				return [
					item.id,
					item.name,
					item.stock + " (" + item.unit + ")",
					item.category
				];
			})
			const warehouse = {
				name: resp.name,
				description: resp.description,
				stock: resp.stock,
				items: reorder(this.lastTarget, items, this.reversed)
			}
			this.setState({warehouse: warehouse});
		})
	}
	
	reorder = (target) => {
		if (this.lastTarget === target)
			this.reversed = !this.reversed
		const sorted = reorder(target, this.state.warehouse.items, this.reversed)
		this.lastTarget = target //used for reverting order if clicked twice in succession
		let warehouse = this.state.warehouse
		warehouse.items = sorted
		this.setState({warehouse: warehouse})
	}
	
	render() {
		if (this.state.warehouse) {
			return (
				<div>
					<WarehouseHeader
						warehouseName={this.state.warehouse.name}
						description={this.state.warehouse.description}
						stock={this.state.warehouse.stock}
					/>
					<Table>
						<TableHeader headers={this.tableHeaders} parent={this}
												 reorderProperties={[0, 1, 2, 3]}
												 orderSelected={[this.reversed, this.lastTarget]}/>
						{
							this.state.warehouse.items.map((item, index) => {
								return (
									<TableRow
										key={index}
										data={item}
										actionComponent={<ItemsStoragePopup source={this.state.warehouse.name} item={item}/>}
									>
									</TableRow>
								)
							})
						}
					</Table>
				</div>
			)
		} else {
			return <Loader/>;
		}
	}
}

export default WarehousePageComponent;