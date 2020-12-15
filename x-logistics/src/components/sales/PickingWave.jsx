import { parseWaveInfo, parseWaveProduct } from "../../parsers/waveParsers.js";
import Table from "../table/Table/Table.jsx";
import TableHeader from "../table/TableHeader/TableHeader.jsx";
import TableRow from "../table/TableRow/TableRow.jsx";
import TableRowSubRow from "../table/TableRowSubRow/TableRowSubRow.jsx";
import ConfirmPickingWaveAction from "./ConfirmPickingWaveAction/ConfirmPickingWaveAction.jsx";

export default function PickingWave() {
    
    const tableHeaders = ["Wave ID", "Created On", "Summary", "Confirm"];
    const subtableHeaders = ["Product ID", "Name", "Category", "Shelf", "Quantity"];

    const pickingWaves = localStorage.getItem("picking_waves") ? JSON.parse(localStorage.getItem("picking_waves")) : [];

    const renderWaves = () => {
        if (pickingWaves.length > 0) {
            return (
                pickingWaves.map((wave, index) => {
                    return (
                        <TableRow subHeaders={subtableHeaders} data={parseWaveInfo(wave.info)} key={index} 
                            actionComponent={<ConfirmPickingWaveAction wave={wave}/>} >
                            {
                                Object.keys(wave.products).map((productKey, index) => {
                                    return (
                                        <TableRowSubRow data={parseWaveProduct(wave.products[productKey])} key={index} />
                                    )
                                })
                            }
                        </TableRow>
                    )
                })
            )
        } else {
            return <span>No Active Picking Waves</span>
        }
    }

    return (
        <Table>
            <TableHeader headers={tableHeaders}/>
            { renderWaves() }
        </Table>
    )
}