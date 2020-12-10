import { Component } from "react";
import Tabel from "../tabel/Tabel/Tabel.jsx";
import TabelHeader from "../tabel/TabelHeader/TabelHeader.jsx";
import TabelRow from "../tabel/TabelRow/TabelRow.jsx";
import ViewWarehouse from "./ViewWarehouse/ViewWarehouse.jsx";
import { getWarehouses } from "../../jasmin/inventory";

class Warehouses extends Component {
    constructor(props) {
        super(props);
        
        this.tabelHeaders = ["Warehouse", "Description", "Total Number of items", "Action"];
        this.wareHouseName = "RECEPTION"
    
        this.state = {
            warehouses: null,
        }
    }
    
    componentDidMount() {
        getWarehouses().then((resp) => {
            const warehouses = resp.map((warehouse) => {
                return {
                    data: [
                        warehouse["warehouse"], warehouse["description"], warehouse["totalItems"]
                    ],  
                }
            })
    
            this.setState({warehouses: warehouses});
        })
    }
    
    render() {
        if (this.state.warehouses) {
            return (
                <div>
                    <Tabel>
                        <TabelHeader headers={this.tabelHeaders}/>
                        {
                            this.state.warehouses.map((item, index) => {
                                return (
                                    <TabelRow 
                                        key={index} 
                                        data={item.data} 
                                        actionComponent={<ViewWarehouse />}
                                    >
                                    </TabelRow>
                                )
                            })
                        }
                    </Tabel>
                </div>
            )
        }
        else {
            return (<h1>todo -{'>'} waiting for request</h1>)
        }
    }
}

export default Warehouses;