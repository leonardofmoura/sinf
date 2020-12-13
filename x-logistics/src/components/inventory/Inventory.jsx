import Tabel from "../tabel/Tabel/Tabel.jsx";
import TabelHeader from "../tabel/TabelHeader/TabelHeader.jsx";
import TabelRow from "../tabel/TabelRow/TabelRow.jsx";
import TabelRowSubRow from "../tabel/TabelRowSubRow/TabelRowSubRow.jsx";
import ViewWarehouse from "./ViewWarehouse/ViewWarehouse.jsx";
import { Component } from "react";
import {getInventory} from "../../jasmin/inventory.js"

class Inventory extends Component {
    constructor (props) {
        super(props);

        this.tabelHeaders = ["ID", "Item Name", "Quantity", "Category"];
        this.subTabelHeaders = ["Quantity", "Warehouse", "Action"];

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
                <Tabel>
                    <TabelHeader headers={this.tabelHeaders}/>
                    {
                        this.state.items.map((item, index) => {
                            return (
                                <TabelRow 
                                    key={index} 
                                    subHeaders={this.subTabelHeaders} 
                                    data={item.data} 
                                >
                                    {
                                        item.warehouses.map((item,index) => {
                                            return (
                                                <TabelRowSubRow 
                                                    data={item} 
                                                    key={index} 
                                                    actionComponent={<ViewWarehouse id={item[1]}/>}
                                                />
                                            )
                                        })
                                    }
                                </TabelRow>
                            )
                        })
                    }
                </Tabel>
            )
        }
        else {
            return (<h1>todo -{'>'} waiting for request</h1>)
        }
    }
}

export default Inventory;