import WarehouseHeader from "./WarehouseHeader/WarehouseHeader";
import Tabel from "../tabel/Tabel/Tabel.jsx";
import TabelHeader from "../tabel/TabelHeader/TabelHeader.jsx";
import TabelRow from "../tabel/TabelRow/TabelRow.jsx";
import { Component } from "react";
import { getWarehouseItems } from "../../jasmin/inventory";

class WarehousePage extends Component {
    constructor(props) {
        super(props);

        this.tabelHeaders = ["ID", "Item Name", "Quantity", "Category"];
        this.wareHouseName = "RECEPTION"

        const itemExample = {
            info: ["0000001", "2080 Ti Graphics cards", "37", "Graphics Cards"],
        };

        this.example = [itemExample,itemExample];

        this.state = {
            warehouse: null,
        }
    }

    componentDidMount() {
        getWarehouseItems("A1").then((resp) => {
            console.log(resp);

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
                    <Tabel>
                        <TabelHeader headers={this.tabelHeaders}/>
                        {
                            this.state.warehouse.items.map((item, index) => {
                                return (
                                    <TabelRow 
                                        key={index} 
                                        data={item} 
                                    >
                                    </TabelRow>
                                )
                            })
                        }
                    </Tabel>
                </div>
            )
        }
        else {
            return (<h1>todo -{'>'} waiting for request</h1>);
        }
    }
}

export default WarehousePage;