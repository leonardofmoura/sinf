import { Component } from "react";
import { withRouter } from "react-router-dom";
import { getPendingPackaging, processSale } from "../../jasmin/sales.js";
import { parseSaleInfo, parsePendingPackagingProduct } from "../../parsers/saleParsers";
import Tabel from "../tabel/Tabel/Tabel.jsx";
import TabelHeader from "../tabel/TabelHeader/TabelHeader.jsx";
import TabelRow from "../tabel/TabelRow/TabelRow.jsx";
import TabelRowSubRow from "../tabel/TabelRowSubRow/TabelRowSubRow.jsx";
import PackagingAction from "./PackagingAction/PackagingAction.jsx";
import ProductStatus from "./ProductStatus/ProductStatus.jsx";

class PendingPackaging extends Component {
    constructor(props) {
        super(props);

        this.tabelHeaders = ["ID", "Customer", "Date", "Summary", "Packaging"];
        this.subTabelHeaders = ["Product ID", "Name", "Category", "Sale", "Picked", "Status"];

        this.state = {sales: null};
    }

    componentDidMount = () => {
        getPendingPackaging().then(newSales => this.setState({sales: newSales}));
    }
    
    handleConfirmPackaging = async (sale) => {
        await processSale(sale);
        this.props.histoy.push("/sales/complete");
    }

    calcSaleStatus = (sale) => {
        let saleStatus = true; //saleStatus = true => Ready to package

        for (const product of sale.products) {
            if (!product.packagingStatus) {
                saleStatus = false;
            }
        }

        return saleStatus;
    }

    renderSales = () => {
        if (this.state.sales !== null) {
            return (
                this.state.sales.map((sale, index) => {
                    return (
                        <TabelRow subHeaders={this.subTabelHeaders} data={parseSaleInfo(sale)} key={index} 
                            actionComponent={<PackagingAction isReady={this.calcSaleStatus(sale)} onConfirm={this.handleConfirmPackaging.bind(this, sale)}/>}>
                            {
                                sale.products.map((product, index) => {
                                    return (
                                        <TabelRowSubRow data={parsePendingPackagingProduct(product)} key={index} actionComponent={<ProductStatus isReady={product.packagingStatus} />} />
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

export default withRouter(PendingPackaging);