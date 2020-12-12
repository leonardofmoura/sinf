import Tabel from "../tabel/Tabel/Tabel.jsx";
import TabelHeader from "../tabel/TabelHeader/TabelHeader.jsx";
import TabelRow from "../tabel/TabelRow/TabelRow.jsx";import ViewWarehouse from "./ViewWarehouse/ViewWarehouse.jsx";


const Warehouses = () => {
    const tabelHeaders = ["Warehouse", "Description", "Total Number of items", "Action"];
    const wareHouseName = "RECEPTION"

    const warehouseExample = {
        info: ["SHIPPING", "The warehouse with items to ship", "37"],
    };

    const example = [warehouseExample,warehouseExample];

    return (
        <div>
            <Tabel>
                <TabelHeader headers={tabelHeaders}/>
                {
                    example.map((item, index) => {
                        return (
                            <TabelRow 
                                key={index} 
                                data={item.info} 
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

export default Warehouses;