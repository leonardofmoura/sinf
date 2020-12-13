import TabsLayout from "../../layouts/TabsLayout";
import InternalsTable from "./InternalsTable";
import {sendJasminRequest} from "../../jasmin/request";
import {Component} from "react";

class Internals extends Component {
	constructor(props) {
		super(props);
		this.state = {
			receptions: [],
			shipping: [],
			shelves: [],
		}
	}
	
	fetchData = async () => {
		let receptions = [],
			shipping = [],
			shelves = []
		const json = await sendJasminRequest('materialsmanagement/stockTransferOrders', 'GET')
		json.data.forEach(item => {
			if (item.sourceWarehouse === "RECEPTION") receptions.push(item)
			else if (item.targetWarehouse === "SHIPPING") shipping.push(item)
			else shelves.push(item)
		})
		return [receptions, shipping, shelves]
	}
	
	componentDidMount() {
		this.fetchData().then(response => {
			this.setState({
				receptions: response[0],
				shipping: response[1],
				shelves: response[2]
			})
		})
	}
	
	render() {
		return (<TabsLayout tabs={[
			{
				path: '/transactions/internals/receptions',
				title: 'Receptions',
				component: <InternalsTable items={this.state.receptions}/>,
				key: 1
			},
			{
				path: '/transactions/internals/shipping',
				title: 'Shipping',
				component: <InternalsTable items={this.state.shipping}/>,
				key: 2
			},
			{
				path: '/transactions/internals/shelves',
				title: 'Between shelves',
				component: <InternalsTable items={this.state.shelves}/>,
				key: 3
			}
		]}/>)
	}
}

export default Internals