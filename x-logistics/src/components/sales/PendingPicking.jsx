import { getPendingPicking } from "../../jasmin/sales.js";
import { parseSaleInfo, parsePendingPickingProduct } from "../../parsers/saleParsers";
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

        this.tabelHeaders = ["ID", "Customer", "Date", "Summary"];
        this.subTabelHeaders = ["Product ID", "Name", "Category", "Sale", "In Wave", "Picked", "Picking"];

        this.selectedItems = [];

        this.state = {sales: null};
    }

    componentDidMount() {
        getPendingPicking().then((newSales) => {
            this.setState({ sales: newSales });
        });
    }
    
    handleItemPick = (saleId, product, quantity) => {
        let itemId = saleId + ":" + product.id;
        product.selectedQuantity = quantity;
        this.selectedItems[itemId] = product;
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
                productQuantity = pickingWaveProducts[itemKey].waveQuantity + this.selectedItems[key].selectedQuantity;
            } else {
                productQuantity = this.selectedItems[key].selectedQuantity;
            }

            numTotalProducts += this.selectedItems[key].selectedQuantity;
            if (!categories.includes(this.selectedItems[key].category)) {
                categories.push(this.selectedItems[key].category); 
            }

            pickingWaveProducts[itemKey] = this.selectedItems[key];
            pickingWaveProducts[itemKey].waveQuantity = productQuantity;
        }

        let waveSummary = numTotalProducts + " total products of " + categories.length + (categories.length > 1 ? " categories" : " category");
        let waveInfo = { id: moment().unix(), createdOn: moment().format("YYYY-MM-DD HH:mm"), summary: waveSummary };
        let pickingWave = {info: waveInfo, products: pickingWaveProducts};

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
                        <TabelRow key={index} subHeaders={this.subTabelHeaders} data={parseSaleInfo(sale)}>
                            {
                                sale.products.map((product, index) => {
                                    return (
                                        <TabelRowSubRow data={parsePendingPickingProduct(product)} key={index} 
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