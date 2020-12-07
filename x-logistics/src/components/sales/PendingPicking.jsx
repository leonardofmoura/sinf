import Tabel from "../tabel/Tabel/Tabel.jsx";
import TabelHeader from "../tabel/TabelHeader/TabelHeader.jsx";
import TabelRow from "../tabel/TabelRow/TabelRow.jsx";
import TabelRowSubRow from "../tabel/TabelRowSubRow/TabelRowSubRow.jsx";
import PickingAction from "./PickingAction/PickingAction.jsx";

export default function PendingPicking() {

    const tabelHeaders = ["ID", "Customer", "Date", "Summary", "Picking"];
    const subTabelHeaders = ["Product ID", "Quantity", "Item Name", "Category", "Picking"];

    const saleExample = {
        saleData: ["0000001", "L Moura", "11/11/2020", "2080 Ti Graphics cards"],
        products: [
            ["0000001", "37", "NVIDIA 2080 Ti", "Graphics cards"],
            ["0000001", "37", "NVIDIA 2080 Ti", "Graphics cards"],
        ]
    };

    const pendingPicking = [saleExample, saleExample];

    const handlePick = () => {
        //TODO
    }

    return (
        <Tabel>
            <TabelHeader headers={tabelHeaders}/>
            {
                pendingPicking.map((sale, index) => {
                    return (
                        <TabelRow key={index} subHeaders={subTabelHeaders} data={sale.saleData}>
                            {
                                sale.products.map((product, index) => {
                                    return (
                                        <TabelRowSubRow data={product} key={index} 
                                            actionComponent={<PickingAction onPick={handlePick}/>}/>
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