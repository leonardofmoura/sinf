import { Component } from "react";
import { getPendingPicking } from "../../jasmin/sales.js";
import Tabel from "../tabel/Tabel/Tabel.jsx";
import TabelHeader from "../tabel/TabelHeader/TabelHeader.jsx";
import TabelRow from "../tabel/TabelRow/TabelRow.jsx";
import TabelRowSubRow from "../tabel/TabelRowSubRow/TabelRowSubRow.jsx";
import CreatePickingWaveButton from "./CreatePickingWaveButton/CreatePickingWaveButton.jsx";
import PickingAction from "./PickingAction/PickingAction.jsx";

export default class PendingPicking extends Component {
    constructor(props) {
        super(props);

        this.tabelHeaders = ["ID", "Customer", "Date", "Summary", "Picking"];
        this.subTabelHeaders = ["Product ID", "Quantity", "Item Name", "Category", "Picking"];

        this.selectedItems = {};

        this.state = {sales: null};
    }

    componentDidMount = () => {
        getPendingPicking().then(newSales => this.setState({sales: newSales}));
    }

    handleItemPick = (productId, quantity) => {
        this.selectedItems[productId] = quantity;
    }

    handleItemUnpick = (productId) => {
        delete this.selectedItems[productId];
    }

    handleCreatePickingWave = () => {
        let pickingWave = {};

        for (const key in this.selectedItems) {
            let itemKey = key.substr(key.lastIndexOf(":") + 1, key.length - key.lastIndexOf(":"));

            if (pickingWave.hasOwnProperty(itemKey)) {
                pickingWave[itemKey] += this.selectedItems[key];
            } else {
                pickingWave[itemKey] = this.selectedItems[key];
            }
        }

        console.log(pickingWave);
    }

    renderSales = () => {
        if (this.state.sales !== null) {
            return (
                this.state.sales.map((sale, index) => {     
                    return (
                        <TabelRow key={index} subHeaders={this.subTabelHeaders} data={sale.info}>
                            {
                                sale.products.map((product, index) => {
                                    return (
                                        <TabelRowSubRow data={product} key={index} 
                                            actionComponent={<PickingAction 
                                                                maxValue={product[1]} 
                                                                onPick={this.handleItemPick.bind(this, sale.info[0] + ":" + product[0])}
                                                                onUnpick={this.handleItemUnpick.bind(this, sale.info[0] + ":" + product[0])}
                                                            />}
                                        />
                                    )
                                })
                            }
                        </TabelRow>
                    )
                })
            )
        }
    }

    render = () => {
        return (
            <Tabel>
                <TabelHeader headers={this.tabelHeaders}/>
                { this.renderSales() }
                <CreatePickingWaveButton onClick={this.handleCreatePickingWave.bind(this)} />
            </Tabel>
        )
    }
}