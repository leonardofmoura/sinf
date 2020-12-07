import Tabel from "../tabel/Tabel/Tabel.jsx";
import TabelHeader from "../tabel/TabelHeader/TabelHeader.jsx";
import TabelRow from "../tabel/TabelRow/TabelRow.jsx";

const Inventory = () => {

    const tabelHeaders = ["ID", "Item Name", "Quantity", "Category", "Warehouse"];

    const saleExample = {
        saleData: ["0000001", "2080 Ti Graphics cards", "37", "Graphics Cards"],
        warehouse: "Reception",
    };

    const pendingPicking = [saleExample, saleExample];

    return (
        <Tabel>
            <TabelHeader headers={tabelHeaders}/>
            {
                pendingPicking.map((sale, index) => {
                    return (
                        <TabelRow 
                            key={index} 
                            subHeaders={tabelHeaders} 
                            data={sale.saleData} 
                            disableExpansion={true}
                            actionComponent={sale.warehouse}
                        />
                    )
                })
            }
        </Tabel>
    )
}

export default Inventory;