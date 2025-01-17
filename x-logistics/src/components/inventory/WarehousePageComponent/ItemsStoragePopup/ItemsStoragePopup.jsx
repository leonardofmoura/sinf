import { max } from 'moment';
import { useState } from 'react';
import Popup from 'reactjs-popup';
import { sendJasminRequest } from '../../../../jasmin/request';
import styles from "./ItemsStoragePopup.module.css";
import Loader from '../../../utils/Loader';


const ItemsStoragePopup = (props) => {
    const [selectedRow, setRow] = useState('A');
    const [selectedCol, setCol] = useState('1');
    const [selectedQuantity, setQuantity] = useState(0);
    const maxQuantity = parseInt(props.item[2].substr(0, props.item[2].length-4));    

    const [loading, setLoading] = useState(false);
    const [done, setDone] = useState(false);

    const _handleRowChange = (event) => {
        setRow(event.target.value);
    }

    const _handleColChange = (event) => {
        setCol(event.target.value);
    }

    const _handleQuantityChange = (event) => {
        console.log('QUANTITY: ' + event.target.value);
        setQuantity(event.target.value);
    }

    const _confirmItemStorage = async () => {
        const body = {
            loadingStreetName: 'Dr. Roberto Frias',
            loadingBuildingNumber: '1',
            loadingPostalZone: '4200-465',
            loadingCityName: 'Porto',
            company: 'GXSA',
            loadingCountry: 'PT',
            unloadingCountry: 'PT',
            sourceWarehouse: props.source,
            targetWarehouse: selectedRow + selectedCol,
            documentLines: [
                {
                    quantity: selectedQuantity,
                    materialsItem: props.item[0],
                }
            ],
        };

        setLoading(true);

        if (0 <= selectedQuantity <= maxQuantity) {
            await sendJasminRequest(
                `materialsManagement/stockTransferOrders`,
                'POST',
                body,
            );
    
            window.location.reload(false);
        }

        setLoading(false);
        setDone(true);
    }

    const rowOptions = [
        'A', 'B', 'C', 'D', 'E', 'F'
    ];

    const columnOptions = [
        '1', '2', '3', '4', '5', '6', '7'
    ];

    return (
        <Popup trigger={open => (
                <button>Move</button>
            )} modal>
            <div className={styles.popUp}>
                <div className={styles.shelfSelectorsSection}>
                    <span>Choose storage section: </span>
                    <div className={styles.shelfSelectors}>
                        <select value={selectedRow} onChange={_handleRowChange}>
                            {
                                rowOptions.map((option) => {
                                    return(
                                        <option key={option}>{option}</option>
                                        )
                                    })
                                }
                        </select>
                        <select value={selectedCol} onChange={_handleColChange}>
                            {
                                columnOptions.map((option) => {
                                    return(
                                        <option key={option}>{option}</option>
                                        )
                                    })
                                }
                        </select>
                    </div>
                </div>
                <div className={styles.quantitySelectorSection}>
                    <span>Choose quantity:</span>
                    <input type="number" min="0" max={maxQuantity} value={selectedQuantity} onChange={_handleQuantityChange}/>
                </div>
                <button disabled={done} type="button" className="btn" onClick = {_confirmItemStorage}>Confirm</button>
                <div class={styles.loaderSection}>
                    { loading && <Loader size="5em" marginTop="0"/> }
                </div>
            </div>
        </Popup>
    )
};

export default ItemsStoragePopup;