import Table from "../table/Table/Table.jsx";
import TableHeader from "../table/TableHeader/TableHeader.jsx";
import TableRow from "../table/TableRow/TableRow.jsx";
import TableRowSubRow from "../table/TableRowSubRow/TableRowSubRow.jsx";
import ViewWarehouse from "./ViewWarehouse/ViewWarehouse.jsx";
import { Component } from "react";
import {getInventory} from "../../jasmin/inventory.js"
import Loader from "../utils/Loader.jsx";

class Inventory extends Component {
    constructor (props) {
        super(props);

        this.tableHeaders = ["ID", "Item Name", "Quantity", "Category"];
        this.subtableHeaders = ["Shelf / Section", "Quantity", "Action"];

        this.state = {
            items: null,
        }
    }

    componentDidMount() {
        getInventory().then((resp) => {
            const items = resp.map((item) => {
                return {
                    data: [
                        item["id"], 
                        item["name"], 
                        item["warehouses"].reduce((acc, val) => acc + val.stock, 0) + " (" + item["unit"] + ")",
                        item["category"],
                    ],
                    warehouses: item["warehouses"].map((w) => {
                        if (w.stock > 0) {
                            return [w.name, w.stock + " (" + item["unit"] + ")"]
                        } else return null;
                    }).filter((w) => w)  
                }
            })

            this.setState({items: items})
        })
    }

    renderItems() {
        if (this.state.items === null) {
            return <Loader />
        } else if (this.state.items.length > 0) {
            return (
                this.state.items.map((item, index) => {
                    return (
                        <TableRow 
                            key={index} 
                            subHeaders={this.subtableHeaders} 
                            data={item.data} 
                        >
                            {
                                item.warehouses.map((item, index) => {
                                    return (
                                        <TableRowSubRow 
                                            data={item} 
                                            key={index} 
                                            actionComponent={<ViewWarehouse id={item[0]}/>}
                                        />
                                    )
                                })
                            }
                        </TableRow>
                    )
                })
            )
        } else if (this.state.items.length === 0) {
            return ( <spans>No items found</spans> )
        }
    }    

    render() {
        return (
            <Table>
                <TableHeader headers={this.tableHeaders}/>
                { this.renderItems() }
            </Table>
        )
    }
}

export default Inventory;