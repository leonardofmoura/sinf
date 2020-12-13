import { Component } from "react";
import { withRouter } from "react-router-dom";
import { getPendingPackaging, processSale } from "../../jasmin/sales.js";
import { parseSaleInfo, parsePendingPackagingProduct } from "../../parsers/saleParsers";
import Table from "../table/Table/Table.jsx";
import TableHeader from "../table/TableHeader/TableHeader.jsx";
import TableRow from "../table/TableRow/TableRow.jsx";
import TableRowSubRow from "../table/TableRowSubRow/TableRowSubRow.jsx";
import Loader from "../utils/Loader.jsx";
import PackagingAction from "./PackagingAction/PackagingAction.jsx";
import ProductStatus from "./ProductStatus/ProductStatus.jsx";

class PendingPackaging extends Component {
    constructor(props) {
        super(props);

        this.tableHeaders = ["ID", "Customer", "Date", "Summary", "Packaging"];
        this.subtableHeaders = ["Product ID", "Name", "Category", "Sale", "Picked", "Status"];

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
        if (this.state.sales === null) {
            return <Loader />
        } else if (this.state.sales.length > 0) {
            return (
                this.state.sales.map((sale, index) => {
                    return (
                        <TableRow subHeaders={this.subtableHeaders} data={parseSaleInfo(sale)} key={index} 
                        actionComponent={<PackagingAction isReady={this.calcSaleStatus(sale)} onConfirm={this.handleConfirmPackaging.bind(this, sale)}/>}>
                            {
                                sale.products.map((product, index) => {
                                    return (
                                        <TableRowSubRow data={parsePendingPackagingProduct(product)} key={index} actionComponent={<ProductStatus isReady={product.packagingStatus} />} />
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

    render = () => {
        return (
            <Table>
                <TableHeader headers={this.tableHeaders}/>
                { this.renderSales() }
            </Table>
        )
    }
}

export default withRouter(PendingPackaging);