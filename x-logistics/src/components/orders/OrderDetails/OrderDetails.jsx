import React, { useState } from 'react';

import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

import styles from './OrderDetails.module.css';

const OrderDetails = (props) => {
    console.log(props.items);

    return (
        <div className={styles.orderDetailsSection}>
            <section className={styles.orderDetailsHeader}>
                <div>Product ID</div>
                <div>Quantity</div>
                <div>Item name</div>
                <div>Category</div>
                <div>Storage</div>
            </section>
            {
                props.items.map((item) => {
                    return(
                        <section className={styles.orderDetailsItem}>
                            <div>???</div>
                            <div>{item.quantity}</div>
                            <div>{item.purchasesItemDescription}</div>
                            <div>???</div>
                            <Popup
                                trigger={open=> (
                                    <button>Confirm</button>
                                )}  
                                modal="true"
                            >
                                <OrderStoragePopup item={item}/>
                            </Popup>
                        </section>
                    )
                })
            }
        </div>
    )
}

const OrderStoragePopup = (props) => {
    const [selectedRow, setRow] = useState('A');
    const [selectedCol, setCol] = useState('1');

    const _handleRowChange = (event) => {
        setRow(event.target.value);
    }

    const _handleColChange = (event) => {
        setCol(event.target.value);
    }

    const _confirmItemStorage = () => {

    }

    const rowOptions = [
        'A', 'B', 'C', 'D', 'E', 'F'
    ];

    const columnOptions = [
        '1', '2', '3', '4', '5', '6', '7'
    ];

    return(
        <div>
            <span className={styles.storagePopup}>Choose storage section:</span>
            <select value={selectedRow} onChange={_handleRowChange}>
                {
                    rowOptions.map((option) => {
                        return(
                            <option>{option}</option>
                        )
                    })
                }
            </select>
            <select value={selectedCol} onChange={_handleColChange}>
                {
                    columnOptions.map((option) => {
                        return(
                            <option>{option}</option>
                        )
                    })
                }
            </select>
            <button onClick = {_confirmItemStorage}>Confirm</button>
        </div>
    )
};

export default OrderDetails;