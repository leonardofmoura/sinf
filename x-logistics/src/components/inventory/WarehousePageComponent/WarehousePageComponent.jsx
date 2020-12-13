import WarehouseHeader from "../WarehouseHeader/WarehouseHeader";
import Table from "../../table/Table/Table.jsx";
import TableHeader from "../../table/TableHeader/TableHeader.jsx";
import TableRow from "../../table/TableRow/TableRow.jsx";
import { Component } from "react";
import { getWarehouseItems } from "../../../jasmin/inventory";

class WarehousePageComponent extends Component {
    constructor(props) {
        super(props);

        this.tableHeaders = ["ID", "Item Name", "Quantity", "Category"];

        this.state = {
            warehouse: null,
        }
    }

    componentDidMount() {
        getWarehouseItems(this.props.id).then((resp) => {
            const warehouse = {
                name: resp.name,
                description: resp.description,
                stock: resp.stock,
                items: resp.items.map((item) => {
                    return [
                        item.id,item.name,item.stock,item.category
                    ];
                })
            };

            this.setState({warehouse: warehouse});
        })
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
                        <TableHeader headers={this.tableHeaders}/>
                        {
                            this.state.warehouse.items.map((item, index) => {
                                return (
                                    <TableRow 
                                        key={index} 
                                        data={item} 
                                    >
                                    </TableRow>
                                )
                            })
                        }
                    </Table>
                </div>
            )
        }
        else {
            return (<h1>todo -{'>'} waiting for request</h1>);
        }
    }
}

export default WarehousePageComponent;