import Tabel from "../tabel/Tabel/Tabel.jsx";
import TabelHeader from "../tabel/TabelHeader/TabelHeader.jsx";
import TabelRow from "../tabel/TabelRow/TabelRow.jsx";
import TabelRowSubRow from "../tabel/TabelRowSubRow/TabelRowSubRow.jsx";

export default function PickingWave() {
    
    const tabelHeaders = ["Wave ID", "Created On", "Summary", "Confirm"];
    const subTabelHeaders = ["Product ID", "Item Name", "Category", "Quantity"];

    const saleExample = {
        saleData: ["0000001", "L Moura", "11/11/2020", "2080 Ti Graphics cards"],
        products: [
            ["0000001", "37", "NVIDIA 2080 Ti", "Graphics cards"],
            ["0000001", "37", "NVIDIA 2080 Ti", "Graphics cards"],
        ]
    };

    localStorage.clear()

    const completeSales = [saleExample, saleExample];

    const pickingWaves = localStorage.getItem("picking_waves") ? JSON.parse(localStorage.getItem("picking_waves")) : [];

    console.log(pickingWaves);

    const handleViewDeliveryNote = () => {
        //TODO
    }

    return (
        <Tabel>
            <TabelHeader headers={tabelHeaders}/>
            {
                completeSales.map((sale, index) => {
                    return (
                        <TabelRow subHeaders={subTabelHeaders} data={sale.saleData} key={index} >
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