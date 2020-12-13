import { useState } from 'react';
import WarehouseHeader from "../WarehouseHeader/WarehouseHeader";
import Table from "../../table/Table/Table.jsx";
import TableHeader from "../../table/TableHeader/TableHeader.jsx";
import TableRow from "../../table/TableRow/TableRow.jsx";
import { Component } from "react";
import { getWarehouseItems } from "../../../jasmin/inventory";
import { sendJasminRequest } from '../../../jasmin/request';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

class WarehousePageComponent extends Component {
    constructor(props) {
        super(props);

        this.tableHeaders = ["ID", "Item Name", "Quantity", "Category", "Action"];

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
                                        actionComponent={
                                            <Popup trigger={open => (<button>Move</button>)} modal>
                                                <ItemsStoragePopup source={this.state.warehouse.name} item={item}/>
                                            </Popup>
                                        }
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

const ItemsStoragePopup = (props) => {
    const [selectedRow, setRow] = useState('A');
    const [selectedCol, setCol] = useState('1');
    const [selectedQuantity, setQuantity] = useState(0);

    const _handleRowChange = (event) => {
        setRow(event.target.value);
    }

    const _handleColChange = (event) => {
        setCol(event.target.value);
    }

    const _handleQuantityChange = (event) => {
        console.log('QUANTITY: ' + event.target.value);
        setQuantity(event.target.value);
    }

    const _confirmItemStorage = async () => {
        const body = {
            loadingStreetName: 'Dr. Roberto Frias',
            loadingBuildingNumber: '1',
            loadingPostalZone: '4200-465',
            loadingCityName: 'Porto',
            company: 'GXSA',
            loadingCountry: 'PT',
            unloadingCountry: 'PT',
            sourceWarehouse: props.source,
            targetWarehouse: selectedRow + selectedCol,
            documentLines: [
                {
                    quantity: selectedQuantity,
                    materialsItem: props.item[0],
                }
            ],
        };
        console.log(props.item[2]);

        if(0 <= selectedQuantity <= props.item[2]) {
            const response = await sendJasminRequest(
                `materialsManagement/stockTransferOrders`,
                'POST',
                body,
            );
    
            console.log('RESPONSE: ');
            console.log(response);
        }
    }

    const rowOptions = [
        'A', 'B', 'C', 'D', 'E', 'F'
    ];

    const columnOptions = [
        '1', '2', '3', '4', '5', '6', '7'
    ];

    return (
        <div>
            <span>Choose storage section: </span>
            <select value={selectedRow} onChange={_handleRowChange}>
                {
                    rowOptions.map((option) => {
                        return(
                            <option key={option}>{option}</option>
                        )
                    })
                }
            </select>
            <select value={selectedCol} onChange={_handleColChange}>
                {
                    columnOptions.map((option) => {
                        return(
                            <option key={option}>{option}</option>
                        )
                    })
                }
            </select>
            <span>Choose quantity:</span>
            <input type="number" min="0" max={props.item[2]} value={selectedQuantity} onChange={_handleQuantityChange}/>
            <button onClick = {_confirmItemStorage}>Confirm</button>
        </div>
    )
};

export default WarehousePageComponent;