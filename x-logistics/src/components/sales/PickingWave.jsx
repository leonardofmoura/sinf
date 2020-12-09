import { parseWaveInfo, parseWaveProduct } from "../../parsers/waveParsers.js";
import Tabel from "../tabel/Tabel/Tabel.jsx";
import TabelHeader from "../tabel/TabelHeader/TabelHeader.jsx";
import TabelRow from "../tabel/TabelRow/TabelRow.jsx";
import TabelRowSubRow from "../tabel/TabelRowSubRow/TabelRowSubRow.jsx";
import ConfirmPickingWaveAction from "./ConfirmPickingWaveAction/ConfirmPickingWaveAction.jsx";

export default function PickingWave() {
    
    const tabelHeaders = ["Wave ID", "Created On", "Summary", "Confirm"];
    const subTabelHeaders = ["Product ID", "Name", "Category", "Shelf", "Quantity"];

    const pickingWaves = localStorage.getItem("picking_waves") ? JSON.parse(localStorage.getItem("picking_waves")) : [];

    const renderWaves = () => {
        if (pickingWaves.length > 0) {
            return (
                pickingWaves.map((wave, index) => {
                    return (
                        <TabelRow subHeaders={subTabelHeaders} data={parseWaveInfo(wave.info)} key={index} 
                            actionComponent={<ConfirmPickingWaveAction wave={wave}/>} >
                            {
                                Object.keys(wave.products).map((productKey, index) => {
                                    return (
                                        <TabelRowSubRow data={parseWaveProduct(wave.products[productKey])} key={index} />
                                    )
                                })
                            }
                        </TabelRow>
                    )
                })
            )
        }
    }

    return (
        <Tabel>
            <TabelHeader headers={tabelHeaders}/>
            { renderWaves() }
        </Tabel>
    )
}