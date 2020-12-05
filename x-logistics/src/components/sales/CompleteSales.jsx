import Tabel from "../tabel/Tabel/Tabel.jsx";
import TabelHeader from "../tabel/TabelHeader/TabelHeader.jsx";
import TabelRow from "../tabel/TabelRow/TabelRow.jsx";
import TabelRowSubRow from "../tabel/TabelRowSubRow/TabelRowSubRow.jsx";
import ViewDeliveryNoteAction from "./ViewDeliveryNoteAction/ViewDeliveryNoteAction.jsx";

export default function CompleteSales() {

    const tabelHeaders = ["ID", "Customer", "Date", "Summary", "Delivery Note"];
    const subTabelHeaders = ["Product ID", "Quantity", "Item Name", "Category"];

    const saleExample = {
        saleData: ["0000001", "L Moura", "11/11/2020", "2080 Ti Graphics cards"],
        products: [
            ["0000001", "37", "NVIDIA 2080 Ti", "Graphics cards"],
            ["0000001", "37", "NVIDIA 2080 Ti", "Graphics cards"],
        ]
    };

    const completeSales = [saleExample, saleExample];

    const handleViewDeliveryNote = () => {
        //TODO
    }

    return (
        <Tabel>
            <TabelHeader headers={tabelHeaders}/>
            {
                completeSales.map((sale, index) => {
                    return (
                        <TabelRow subHeaders={subTabelHeaders} data={sale.saleData} key={index} 
                            actionComponent={<ViewDeliveryNoteAction onClick={handleViewDeliveryNote}/>}>
                            {
                                sale.products.map((product, index) => {
                                    return (
                                        <TabelRowSubRow data={product} key={index}/>
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