import Table from "../table/Table/Table.jsx";
import TableHeader from "../table/TableHeader/TableHeader.jsx";
import TableRow from "../table/TableRow/TableRow.jsx";
import TableRowSubRow from "../table/TableRowSubRow/TableRowSubRow.jsx";
import ViewWarehouse from "./ViewWarehouse/ViewWarehouse.jsx";
import { Component } from "react";
import {getInventory} from "../../jasmin/inventory.js"

class Inventory extends Component {
    constructor (props) {
        super(props);

        this.tableHeaders = ["ID", "Item Name", "Quantity", "Category"];
        this.subtableHeaders = ["Quantity", "Warehouse", "Action"];

        this.state = {
            items: null,
        }
    }

    componentDidMount() {
        getInventory().then((resp) => {
            const items = resp.map((item) => {
                return {
                    data: [
                        item["id"], item["name"], 
                        item["warehouses"].reduce((acc, val) => acc + val.stock, 0),
                        item["category"],
                    ],
                    warehouses: item["warehouses"].map((w) => {
                        return [w.stock, w.name]
                    }).filter((w) => { return (w[0] > 0)})    
                }
            })

            this.setState({items: items})
        })
    }

    render() {
        if (this.state.items) {
            return (
                <Table>
                    <TableHeader headers={this.tableHeaders}/>
                    {
                        this.state.items.map((item, index) => {
                            return (
                                <TableRow 
                                    key={index} 
                                    subHeaders={this.subtableHeaders} 
                                    data={item.data} 
                                >
                                    {
                                        item.warehouses.map((item,index) => {
                                            return (
                                                <TableRowSubRow 
                                                    data={item} 
                                                    key={index} 
                                                    actionComponent={<ViewWarehouse id={item[1]}/>}
                                                />
                                            )
                                        })
                                    }
                                </TableRow>
                            )
                        })
                    }
                </Table>
            )
        }
        else {
            return (<h1>todo -{'>'} waiting for request</h1>)
        }
    }
}

export default Inventory;