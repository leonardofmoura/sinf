import WarehouseHeader from "./WarehouseHeader/WarehouseHeader";
import Tabel from "../tabel/Tabel/Tabel.jsx";
import TabelHeader from "../tabel/TabelHeader/TabelHeader.jsx";
import TabelRow from "../tabel/TabelRow/TabelRow.jsx";
import { Component } from "react";

class WarehousePage extends Component {
    constructor(props) {
        super(props);

        this.tabelHeaders = ["ID", "Item Name", "Quantity", "Category"];
        this.wareHouseName = "RECEPTION"

        const itemExample = {
            info: ["0000001", "2080 Ti Graphics cards", "37", "Graphics Cards"],
        };

        this.example = [itemExample,itemExample];
    }

    render() {
        return (
            <div>
                <WarehouseHeader warehouseName={this.wareHouseName} />
                <Tabel>
                    <TabelHeader headers={this.tabelHeaders}/>
                    {
                        this.example.map((item, index) => {
                            return (
                                <TabelRow 
                                    key={index} 
                                    data={item.info} 
                                >
                                </TabelRow>
                            )
                        })
                    }
                </Tabel>
            </div>
        )
    }
}

export default WarehousePage;