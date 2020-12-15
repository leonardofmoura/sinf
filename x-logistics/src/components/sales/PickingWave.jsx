import { parseWaveInfo, parseWaveProduct } from "../../parsers/waveParsers.js";
import Table from "../table/Table/Table.jsx";
import TableHeader from "../table/TableHeader/TableHeader.jsx";
import TableRow from "../table/TableRow/TableRow.jsx";
import TableRowSubRow from "../table/TableRowSubRow/TableRowSubRow.jsx";
import ConfirmPickingWaveAction from "./ConfirmPickingWaveAction/ConfirmPickingWaveAction.jsx";
import { useHistory } from "react-router-dom";
import { confirmPickedProduct } from "../../jasmin/sales";
import React, {useRef, useState} from "react";
import Loader from "../utils/Loader.jsx";
import {reorderDoubleArray} from "../../utils/reoder";

export default function PickingWave() {
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    
    const tableHeaders = ["Wave ID", "Created On", "Summary", "Confirm"];
    const subtableHeaders = ["Product ID", "Name", "Category", "Shelf", "Quantity"];
  
    let lastTarget = useRef("id")
    let reversed = useRef(true)
    const [pickingWaves,setPickingWaves] = useState(reorderDoubleArray(lastTarget.current,localStorage.getItem("picking_waves") ? JSON.parse(localStorage.getItem("picking_waves")) : [],reversed.current,"info"));

    
    const handleConfirmWave = async (wave) => {
        setLoading(true);

        let products = wave.products;
        let isPendingPackaging = false;

        for (const key in products) {
            let product = products[key];

            if (product.saleQuantity <= product.waveQuantity + product.pickedQuantity) {
                isPendingPackaging = true;
            }

            await confirmPickedProduct(product, product.waveQuantity);
        }
 
        let storedPickingWaves = localStorage.getItem("picking_waves") ? JSON.parse(localStorage.getItem("picking_waves")) : [];
        storedPickingWaves.splice(storedPickingWaves.indexOf(wave), 1);

        localStorage.setItem("picking_waves", JSON.stringify(storedPickingWaves));

        let redirectUrl = "/sales/" + (isPendingPackaging ? "pending_packaging" : "pending_picking");
        history.push(redirectUrl);

        setLoading(false);
    }

    const renderWaves = () => {
        if (loading) {
            return <Loader />
        }

        if (pickingWaves.length > 0) {
            return (
                pickingWaves.map((wave, index) => {
                    return (
                        <TableRow subHeaders={subtableHeaders} data={parseWaveInfo(wave.info)} key={index} 
                            actionComponent={<ConfirmPickingWaveAction onAction={handleConfirmWave.bind(this, wave)}/>} >
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
    const reorder = (target) => {
        if (lastTarget.current === target)
            reversed.current = !reversed.current
        const sorted = reorderDoubleArray(target, pickingWaves, reversed.current,"info")
        lastTarget.current = target //used for reverting order if clicked twice in succession
        setPickingWaves(sorted)
    }
    console.log(pickingWaves)
    return (
        <Table>
            <TableHeader headers={tableHeaders} reorder={reorder}
                         reorderProperties={["id", "createdOn", "summary"]}
                         orderSelected={[reversed.current, lastTarget.current]}/>
            { renderWaves() }
        </Table>
    )
}