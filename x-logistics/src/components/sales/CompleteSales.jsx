import { Component } from "react";
import { withRouter } from "react-router-dom";
import { getCompleteSales } from "../../jasmin/sales.js";
import { parseCompleteProduct, parseSaleInfo } from "../../parsers/saleParsers.js";
import Table from "../table/Table/Table.jsx";
import TableHeader from "../table/TableHeader/TableHeader.jsx";
import TableRow from "../table/TableRow/TableRow.jsx";
import TableRowSubRow from "../table/TableRowSubRow/TableRowSubRow.jsx";
import Loader from "../utils/Loader.jsx";
import ViewDeliveryNoteAction from "./ViewDeliveryNoteAction/ViewDeliveryNoteAction.jsx";
import {reorderDoubleArray} from "../../utils/reoder";

class CompleteSales extends Component {
    constructor(props) {
        super(props);

        this.tableHeaders = ["ID", "Customer", "Date", "Summary", "Delivery Note"];
        this.subtableHeaders = ["Product ID", "Name", "Category", "Quantity"];

        this.state = {sales: null};
        this.lastTarget = "id"
        this.reversed = false
    }

    componentDidMount = () => {
        getCompleteSales().then(newSales => {
            this.setState({sales: reorderDoubleArray(this.lastTarget,newSales,this.reversed,"info")})});
    }

    renderSales = () => {
        if (this.state.sales === null) {
            return <Loader />
        } else if (this.state.sales.length > 0) {
            return (
                this.state.sales.map((sale, index) => {
                    return (
                        <TableRow subHeaders={this.subtableHeaders} data={parseSaleInfo(sale)} key={index} 
                        actionComponent={<ViewDeliveryNoteAction id={sale.info.jasminId}/>}>
                            {
                                sale.products.map((product, index) => {
                                    return (
                                        <TableRowSubRow data={parseCompleteProduct(product)} key={index}/>
                                        )
                                    })
                            }
                        </TableRow>
                    )
                })
            )
        } else if (this.state.sales.length === 0) {
            return (<span>No sales found</span>)
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
                <TableHeader headers={this.tableHeaders} center={true} parent={this}
                             reorderProperties={["id", "customer", "date"]}
                             orderSelected={[this.reversed, this.lastTarget]}/>
                { this.renderSales() }
            </Table>
        )
    }
}

export default withRouter(CompleteSales);