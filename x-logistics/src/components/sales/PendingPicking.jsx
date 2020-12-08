import { getPendingPicking } from "../../jasmin/sales.js";
import { parseSaleInfo, parseProduct } from "../../parsers/tabelParsers";
import Tabel from "../tabel/Tabel/Tabel.jsx";
import TabelHeader from "../tabel/TabelHeader/TabelHeader.jsx";
import TabelRow from "../tabel/TabelRow/TabelRow.jsx";
import TabelRowSubRow from "../tabel/TabelRowSubRow/TabelRowSubRow.jsx";
import CreatePickingWaveButton from "./CreatePickingWaveButton/CreatePickingWaveButton.jsx";
import PickingAction from "./PickingAction/PickingAction.jsx";
import { Component  } from "react";
import { withRouter } from "react-router-dom";
const moment = require("moment");

class PendingPicking extends Component {
    constructor(props) {
        super(props);

        this.tabelHeaders = ["ID", "Customer", "Date", "Summary", "Picking"];
        this.subTabelHeaders = ["Product ID", "Quantity", "Item Name", "Category", "Picking"];

        this.selectedItems = [];

        this.state = {sales: null};
    }

    componentDidMount() {
        getPendingPicking().then(newSales => this.setState({ sales: newSales }));
    }
    
    handleItemPick = (saleId, product, quantity) => {
        let itemId = saleId + ":" + product.id;
        this.selectedItems[itemId] = {product: product, quantity: quantity};
    }

    handleItemUnpick = (saleId, product) => {
        let itemId = saleId + ":" + product.id;
        delete this.selectedItems[itemId];
    }

    handleCreatePickingWave = () => {
        let pickingWaveProducts = [];
        for (const key in this.selectedItems) {
            let itemKey = key.substr(key.lastIndexOf(":") + 1, key.length - key.lastIndexOf(":"));
            
            let productQuantity = 0;
            if (pickingWaveProducts.hasOwnProperty(itemKey)) {
                productQuantity = pickingWaveProducts[itemKey].quantity + this.selectedItems[key].quantity;
            } else {
                productQuantity = this.selectedItems[key].quantity;
            }

            delete this.selectedItems[key].product.quantity;

            pickingWaveProducts[itemKey] = {product: this.selectedItems[key].product, quantity: productQuantity};
        }

        let pickingWave = {id: moment().unix(), products: pickingWaveProducts};

        let storedPickingWaves = localStorage.getItem("picking_waves") ? JSON.parse(localStorage.getItem("picking_waves")) : [];
        storedPickingWaves.push(pickingWave);

        localStorage.setItem("picking_waves", JSON.stringify(storedPickingWaves));

        this.props.history.push("/sales/picking_waves");
    }

    renderSales = () => {
        if (this.state.sales !== null) {
            return (
                this.state.sales.map((sale, index) => {     
                    return (
                        <TabelRow key={index} subHeaders={this.subTabelHeaders} data={parseSaleInfo(sale.info)}>
                            {
                                sale.products.map((product, index) => {
                                    return (
                                        <TabelRowSubRow data={parseProduct(product)} key={index} 
                                            actionComponent={<PickingAction 
                                                                product={product}
                                                                saleId={sale.info.id}
                                                                onPick={this.handleItemPick}
                                                                onUnpick={this.handleItemUnpick}
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
                <CreatePickingWaveButton onClick={this.handleCreatePickingWave} />
            </Tabel>
        )
    }
}

export default withRouter(PendingPicking);