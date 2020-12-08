import { Component } from "react";
import { getPendingPackaging } from "../../jasmin/sales.js";
import Tabel from "../tabel/Tabel/Tabel.jsx";
import TabelHeader from "../tabel/TabelHeader/TabelHeader.jsx";
import TabelRow from "../tabel/TabelRow/TabelRow.jsx";
import TabelRowSubRow from "../tabel/TabelRowSubRow/TabelRowSubRow.jsx";
import PackagingAction from "./PackagingAction/PackagingAction.jsx";
import ProductStatus from "./ProductStatus/ProductStatus.jsx";

export default class PendingPackaging extends Component {
    constructor(props) {
        super(props);

        this.tabelHeaders = ["ID", "Customer", "Date", "Summary", "Packaging"];
        this.subTabelHeaders = ["Product ID", "Quantity", "Item Name", "Category", "Status"];

        this.state = {sales: null};
    }

    componentDidMount = () => {
        getPendingPackaging().then(newSales => this.setState({sales: newSales}));
    }
    
    handleConfirmPackaging = () => {
        //TODO
    }

    calcSaleStatus = (saleIndex) => {
        //TODO
        return true;
    }

    renderSales = () => {
        if (this.state.sales !== null) {
            return (
                this.state.sales.map((sale, index) => {
                    return (
                        <TabelRow subHeaders={this.subTabelHeaders} data={sale.info} key={index} 
                            actionComponent={<PackagingAction isReady={this.calcSaleStatus(index)} onConfirm={this.handleConfirmPackaging}/>}>
                            {
                                sale.products.map((product, index) => {
                                    return (
                                        <TabelRowSubRow data={product} key={index} actionComponent={<ProductStatus isReady={product.packagingStatus} />} />
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
            </Tabel>
        )
    }
}