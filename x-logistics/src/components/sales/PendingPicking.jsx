import { Component } from "react";
import { getAllSales } from "../../jasmin/sales.js";
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

        this.state = {sales: null};
    }

    componentDidMount = () => {
        getAllSales().then(newSales => this.setState({sales: newSales}));
    }

    renderSales = () => {
        if (this.state.sales !== null) {
            return (
                this.state.sales.map((sale, index) => {     
                    return (
                        <TabelRow key={index} subHeaders={this.subTabelHeaders} data={sale.saleInfo}>
                            {
                                sale.products.map((product, index) => {
                                    return (
                                        <TabelRowSubRow data={product} key={index} 
                                            actionComponent={<PickingAction onPick={this.handleItemPick}/>}/>
                                    )
                                })
                            }
                        </TabelRow>
                    )
                })
            )
        }
    }

    handleItemPick = () => {
        //TODO
    }

    handleCreatePickingWave = () => {
        //TODO
    }

    render = () => {
        return (
            <Tabel>
                <TabelHeader headers={this.tabelHeaders}/>
                { this.renderSales() }
                <CreatePickingWaveButton onPick={this.handleCreatePickingWave} />
            </Tabel>
        )
    }
}