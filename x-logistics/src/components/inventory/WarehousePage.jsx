import WarehouseHeader from "./WarehouseHeader/WarehouseHeader";
import Tabel from "../tabel/Tabel/Tabel.jsx";
import TabelHeader from "../tabel/TabelHeader/TabelHeader.jsx";
import TabelRow from "../tabel/TabelRow/TabelRow.jsx";;

const WarehousePage = () => {
    const tabelHeaders = ["ID", "Item Name", "Quantity", "Category"];
    const wareHouseName = "RECEPTION"

    const itemExample = {
        info: ["0000001", "2080 Ti Graphics cards", "37", "Graphics Cards"],
    };

    const example = [itemExample,itemExample];

    return (
        <div>
            <WarehouseHeader warehouseName={wareHouseName} />
            <Tabel>
                <TabelHeader headers={tabelHeaders}/>
                {
                    example.map((item, index) => {
                        return (
                            <TabelRow 
                                key={index} 
                                data={item.info} 
                            >
                            </TabelRow>
                        )
                    })
                }
            </Tabel>
        </div>
    )
}

export default WarehousePage;