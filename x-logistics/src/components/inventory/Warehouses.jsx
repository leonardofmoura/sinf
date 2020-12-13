import { Component } from "react";
import Table from "../table/Table/Table.jsx";
import TableHeader from "../table/TableHeader/TableHeader.jsx";
import TableRow from "../table/TableRow/TableRow.jsx";
import ViewWarehouse from "./ViewWarehouse/ViewWarehouse.jsx";
import { getWarehouses } from "../../jasmin/inventory";
import Loader from "../utils/Loader.jsx";

class Warehouses extends Component {
    constructor(props) {
        super(props);
        
        this.tableHeaders = ["Warehouse", "Description", "Total Number of items", "Action"];
        this.wareHouseName = "RECEPTION"
    
        this.state = {
            warehouses: null,
        }
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
    
            this.setState({warehouses: warehouses});
        })
    }

    renderWarehouses() {
        if (this.state.warehouses === null) {
            return <Loader />
        } else if (this.state.warehouses.length > 0) {
            return (
                this.state.warehouses.map((item, index) => {
                    return (
                        <TableRow 
                            key={index} 
                            data={item.data} 
                            actionComponent={<ViewWarehouse id={item.data[0]}/>}
                        >
                        </TableRow>
                    )
                })
            )
        } else if (this.state.warehouses.length === 0) {
            return ( <spans>No warehouses found</spans>)
        }
    }
    
    render() {
        return (
            <Table>
                <TableHeader headers={this.tableHeaders}/>
                { this.renderWarehouses() }
            </Table>
        )
    }
}

export default Warehouses;