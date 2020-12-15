import { Component } from "react";
import Table from "../table/Table/Table.jsx";
import TableHeader from "../table/TableHeader/TableHeader.jsx";
import TableRow from "../table/TableRow/TableRow.jsx";
import ViewWarehouse from "./ViewWarehouse/ViewWarehouse.jsx";
import { getWarehouses } from "../../jasmin/inventory";
import Loader from "../utils/Loader.jsx";
import {reorderDoubleArray} from "../utils/Reoder";

class Warehouses extends Component {
    constructor(props) {
        super(props);
        
        this.tableHeaders = ["Shelf / Section", "Description", "Total Number of items", "Action"];
        this.wareHouseName = "RECEPTION"
    
        this.state = {
            warehouses: null,
        }
        this.lastTarget = 0
        this.reversed = true
    }
    
    componentDidMount() {
        getWarehouses().then((resp) => {
            const warehouses = resp.map((warehouse) => {
                return {
                    data: [
                        warehouse["warehouse"], warehouse["description"], warehouse["totalItems"]
                    ],  
                }
            })
    
            this.setState({warehouses: reorderDoubleArray(this.lastTarget,warehouses,this.reversed,"data")});
        })
    }
    
    reorder = (target) => {
        if (this.lastTarget === target)
            this.reversed = !this.reversed
        const sorted = reorderDoubleArray(target, this.state.warehouses, this.reversed,"data")
        this.lastTarget = target //used for reverting order if clicked twice in succession
        this.setState({warehouses: sorted})
    }

    renderWarehouses() {
        if (this.state.warehouses === null) {
            return <Loader />
        } else if (this.state.warehouses.length > 0) {
            return (
                this.state.warehouses.map((item, index) => {
                    if (item.data[0] !== "A0") {
                        return (
                            <TableRow 
                                key={index} 
                                data={item.data} 
                                actionComponent={<ViewWarehouse id={item.data[0]}/>}
                            >
                            </TableRow>
                        )
                    }
                })
            )
        } else if (this.state.warehouses.length === 0) {
            return ( <spans>No warehouses found</spans>)
        }
    }
    
    render() {
        return (
            <Table>
                <TableHeader headers={this.tableHeaders}  parent={this}
                             reorderProperties={[0,1,2]}
                             orderSelected={[this.reversed, this.lastTarget]}/>
                { this.renderWarehouses() }
            </Table>
        )
    }
}

export default Warehouses;