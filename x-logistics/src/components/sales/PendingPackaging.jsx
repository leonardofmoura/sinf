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
import {reorderDoubleArray} from "../../utils/reoder";

class PendingPackaging extends Component {
    constructor(props) {
        super(props);

        this.tableHeaders = ["ID", "Customer", "Date", "Summary", "Packaging"];
        this.subtableHeaders = ["Product ID", "Name", "Category", "Sale", "Picked", "Status"];

        this.state = {
            sales: null,
            loading: false,
        };
        this.lastTarget = "id"
        this.reversed = true
    }

    componentDidMount = () => {
        getPendingPackaging().then(newSales => {
            this.setState({sales: reorderDoubleArray(this.lastTarget,newSales,this.reversed,"info")})});
    }
    
    handleConfirmPackaging = async (sale) => {
        this.setState({loading: true});
        await processSale(sale);
        this.props.history.push("/sales/complete");
        this.setState({loading: false});
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
        if (this.state.loading) {
            return <Loader />
        }

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
            </Table>
        )
    }
}

export default withRouter(PendingPackaging);