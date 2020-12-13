import { Component } from "react";
import { withRouter } from "react-router-dom";
import { getCompleteSales } from "../../jasmin/sales.js";
import { parseCompleteProduct, parseSaleInfo } from "../../parsers/saleParsers.js";
import Table from "../table/Table/Table.jsx";
import TableHeader from "../table/TableHeader/TableHeader.jsx";
import TableRow from "../table/TableRow/TableRow.jsx";
import TableRowSubRow from "../table/TableRowSubRow/TableRowSubRow.jsx";
import ViewDeliveryNoteAction from "./ViewDeliveryNoteAction/ViewDeliveryNoteAction.jsx";

class CompleteSales extends Component {
    constructor(props) {
        super(props);

        this.tableHeaders = ["ID", "Customer", "Date", "Summary", "Delivery Note"];
        this.subtableHeaders = ["Product ID", "Name", "Category", "Quantity"];

        this.state = {sales: null};
    }

    componentDidMount = () => {
        getCompleteSales().then(newSales => this.setState({sales: newSales}));
    }

    renderSales = () => {
        if (this.state.sales !== null) {
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

export default withRouter(CompleteSales);