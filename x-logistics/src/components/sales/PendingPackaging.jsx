import Tabel from "../tabel/Tabel/Tabel.jsx";
import TabelHeader from "../tabel/TabelHeader/TabelHeader.jsx";
import TabelRow from "../tabel/TabelRow/TabelRow.jsx";
import TabelRowSubRow from "../tabel/TabelRowSubRow/TabelRowSubRow.jsx";
import PackagingAction from "./PackagingAction/PackagingAction.jsx";
import ProductStatus from "./ProductStatus/ProductStatus.jsx";

export default function PendingPackaging() {

    const tabelHeaders = ["ID", "Customer", "Date", "Summary", "Packaging"];
    const subTabelHeaders = ["Product ID", "Quantity", "Item Name", "Category", "Status"];

    const saleExample = {
        saleData: ["0000001", "L Moura", "11/11/2020", "2080 Ti Graphics cards"],
        products: [
            ["0000001", "37", "NVIDIA 2080 Ti", "Graphics cards"],
            ["0000001", "37", "NVIDIA 2080 Ti", "Graphics cards"],
        ]
    };

    const pendingPackaging = [saleExample, saleExample];

    const handleConfirmPackaging = () => {
        //TODO
    }

    const calcProductStatus = (productIndex) => {
        //TODO
        return true;
    }

    const calcSaleStatus = (saleIndex) => {
        //TODO
        return true;
    }

    return (
        <Tabel>
            <TabelHeader headers={tabelHeaders}/>
            {
                pendingPackaging.map((sale, index) => {
                    return (
                        <TabelRow subHeaders={subTabelHeaders} data={sale.saleData} key={index} 
                            actionComponent={<PackagingAction isReady={calcSaleStatus(index)} onConfirm={handleConfirmPackaging}/>}>
                            {
                                sale.products.map((product, index) => {
                                    return (
                                        <TabelRowSubRow data={product} key={index} actionComponent={<ProductStatus isReady={calcProductStatus(index)} />} />
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