import { Component } from "react";
import { withRouter } from "react-router-dom";
import { getCompleteSales } from "../../jasmin/sales.js";
import { parseCompleteProduct, parseSaleInfo } from "../../parsers/saleParsers.js";
import Tabel from "../tabel/Tabel/Tabel.jsx";
import TabelHeader from "../tabel/TabelHeader/TabelHeader.jsx";
import TabelRow from "../tabel/TabelRow/TabelRow.jsx";
import TabelRowSubRow from "../tabel/TabelRowSubRow/TabelRowSubRow.jsx";
import ViewDeliveryNoteAction from "./ViewDeliveryNoteAction/ViewDeliveryNoteAction.jsx";

class CompleteSales extends Component {
    constructor(props) {
        super(props);

        this.tabelHeaders = ["ID", "Customer", "Date", "Summary", "Delivery Note"];
        this.subTabelHeaders = ["Product ID", "Name", "Category", "Quantity"];

        this.state = {sales: null};
    }

    componentDidMount = () => {
        getCompleteSales().then(newSales => this.setState({sales: newSales}));
    }

    handleViewDeliveryNote = (sale) => {
        this.props.history.push('/delivery_note/' + sale.info.jasminId);
    }

    renderSales = () => {
        if (this.state.sales !== null) {
            return (
                this.state.sales.map((sale, index) => {
                    return (
                        <TabelRow subHeaders={this.subTabelHeaders} data={parseSaleInfo(sale)} key={index} 
                            actionComponent={<ViewDeliveryNoteAction onClick={this.handleViewDeliveryNote.bind(this, sale)}/>}>
                            {
                                sale.products.map((product, index) => {
                                    return (
                                        <TabelRowSubRow data={parseCompleteProduct(product)} key={index}/>
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

export default withRouter(CompleteSales);