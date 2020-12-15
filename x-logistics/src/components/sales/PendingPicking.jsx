import { getPendingPicking } from "../../jasmin/sales.js";
import { parseSaleInfo, parsePendingPickingProduct } from "../../parsers/saleParsers";
import Table from "../table/Table/Table.jsx";
import TableHeader from "../table/TableHeader/TableHeader.jsx";
import TableRow from "../table/TableRow/TableRow.jsx";
import TableRowSubRow from "../table/TableRowSubRow/TableRowSubRow.jsx";
import CreatePickingWaveButton from "./CreatePickingWaveButton/CreatePickingWaveButton.jsx";
import PickingAction from "./PickingAction/PickingAction.jsx";
import { Component  } from "react";
import { withRouter } from "react-router-dom";
import Loader from "../utils/Loader.jsx";
import {reorderDoubleArray} from "../../utils/reoder";
const moment = require("moment");

class PendingPicking extends Component {
    constructor(props) {
        super(props);

        this.tableHeaders = ["ID", "Customer", "Date", "Summary"];
        this.subtableHeaders = ["Product ID", "Name", "Category", "Sale", "In Wave", "Picked", "Picking"];

        this.selectedItems = [];

        this.state = {sales: null};
        this.lastTarget = "id"
        this.reversed = true
    }

    componentDidMount() {
        getPendingPicking().then((newSales) => {
            this.setState({sales: reorderDoubleArray(this.lastTarget,newSales,this.reversed,"info")});
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
        if (this.state.sales === null) {
            return <Loader />
        } else if (this.state.sales.length > 0) {
            return (
                this.state.sales.map((sale, index) => {     
                    return (
                        <TableRow key={index} subHeaders={this.subtableHeaders} data={parseSaleInfo(sale)}>
                            {
                                sale.products.map((product, index) => {
                                    return (
                                        <TableRowSubRow data={parsePendingPickingProduct(product)} key={index} 
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
                        </TableRow>
                    )
                })
            )
        } else if (this.state.sales.length === 0) {
            return ( <span>No sales found</span> )
        }
    }
    reorder = (target) => {
        if (this.lastTarget === target)
            this.reversed = !this.reversed
        const sorted = reorderDoubleArray(target, this.state.sales, this.reversed,"info")
        this.lastTarget = target //used for reverting order if clicked twice in succession
        this.setState({sales: sorted})
    }
    render = () => {
        return (
            <Table>
                <TableHeader headers={this.tableHeaders} parent={this}
                             reorderProperties={["id", "customer", "date"]}
                             orderSelected={[this.reversed, this.lastTarget]}/>
                { this.renderSales() }
                <CreatePickingWaveButton onClick={this.handleCreatePickingWave} />
            </Table>
        )
    }
}

export default withRouter(PendingPicking);