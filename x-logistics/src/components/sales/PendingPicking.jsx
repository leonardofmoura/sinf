import { getPendingPicking } from "../../jasmin/sales.js";
import { parseSaleInfo, parseProduct } from "../../parsers/saleParsers";
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
        getPendingPicking().then(newSales => this.setState({ sales: this.filterSales(newSales) }));
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
        let numTotalProducts = 0;
        let pickingWaveProducts = {};
        let categories = [];

        for (const key in this.selectedItems) {
            let itemKey = key.substr(key.lastIndexOf(":") + 1, key.length - key.lastIndexOf(":"));
            
            let productQuantity = 0;
            if (pickingWaveProducts.hasOwnProperty(itemKey)) {
                productQuantity = pickingWaveProducts[itemKey].quantity + this.selectedItems[key].quantity;
            } else {
                productQuantity = this.selectedItems[key].quantity;
            }

            numTotalProducts += this.selectedItems[key].quantity;
            if (!categories.includes(this.selectedItems[key].category)) {
                categories.push(this.selectedItems[key].category); 
            }

            delete this.selectedItems[key].product.quantity;

            pickingWaveProducts[itemKey] = {product: this.selectedItems[key].product, quantity: productQuantity};
        }

        let waveSummary = numTotalProducts + " total products of " + categories.length + (categories.length > 1 ? " categories" : " category");
        let waveInfo = { id: moment().unix(), createdOn: moment().format("YYYY-MM-DD HH:mm"), summary: waveSummary };
        let pickingWave = {info: waveInfo, products: pickingWaveProducts};

        let storedPickingWaves = localStorage.getItem("picking_waves") ? JSON.parse(localStorage.getItem("picking_waves")) : [];
        storedPickingWaves.push(pickingWave);

        localStorage.setItem("picking_waves", JSON.stringify(storedPickingWaves));

        this.props.history.push("/sales/picking_waves");
    }

    filterSales = (sales) => {
        let pickingWaves = localStorage.getItem("picking_waves") ? JSON.parse(localStorage.getItem("picking_waves")) : [];

        if (pickingWaves.length === 0) {
            return sales;
        }

        let waveProductsInfo = [];
        for (const wave of pickingWaves) {
            for (const productKey in wave.products) {

                if (waveProductsInfo.hasOwnProperty(productKey)) {
                    waveProductsInfo[productKey] += wave.products[productKey].quantity;
                } else {
                    waveProductsInfo[productKey] = wave.products[productKey].quantity;
                }
            }
        }

        for (const sale of sales) {
            for (const product of sale.products) {
                let oldQuantity = product.quantity;
                if (waveProductsInfo.hasOwnProperty(product.id)) {
                    product.isInPickingWave = true;
                    product.quantity -= waveProductsInfo[product.id];

                    if (product.quantity > 0) {
                        product.waveQuantity = waveProductsInfo[product.id];
                        waveProductsInfo[product.id] = 0;
                    } else {
                        waveProductsInfo[product.id] = Math.abs(product.quantity);
                        product.waveQuantity = oldQuantity;
                    }
                }
            }
        } 

        return sales;
    }

    renderSales = () => {
        if (this.state.sales !== null) {
            return (
                this.state.sales.map((sale, index) => {     
                    return (
                        <TabelRow key={index} subHeaders={this.subTabelHeaders} data={parseSaleInfo(sale)}>
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