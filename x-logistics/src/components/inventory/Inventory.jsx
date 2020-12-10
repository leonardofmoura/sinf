import Tabel from "../tabel/Tabel/Tabel.jsx";
import TabelHeader from "../tabel/TabelHeader/TabelHeader.jsx";
import TabelRow from "../tabel/TabelRow/TabelRow.jsx";
import TabelRowSubRow from "../tabel/TabelRowSubRow/TabelRowSubRow.jsx";
import ViewWarehouse from "./ViewWarehouse/ViewWarehouse.jsx";

const Inventory = () => {

    const tabelHeaders = ["ID", "Item Name", "Quantity", "Category"];
    const subTabelHeaders = ["ID", "Quantity", "Warehouse", "Action"];

    const itemExample = {
        info: ["0000001", "2080 Ti Graphics cards", "37", "Graphics Cards"],
        itemWarehouses: [
            ["000001","30","Reception"],
            ["000002","7","A1"],
        ],
    };

    const example = [itemExample,itemExample];

    return (
        <Tabel>
            <TabelHeader headers={tabelHeaders}/>
            {
                example.map((item, index) => {
                    return (
                        <TabelRow 
                            key={index} 
                            subHeaders={subTabelHeaders} 
                            data={item.info} 
                        >
                            {
                                item.itemWarehouses.map((item,index) => {
                                    return (
                                        <TabelRowSubRow 
                                            data={item} 
                                            key={index} 
                                            actionComponent={<ViewWarehouse />}
                                        />
                                    )
                                })
                            }
                        </TabelRow>
                    )
                })
            }
        </Tabel>
    )
}

export default Inventory;