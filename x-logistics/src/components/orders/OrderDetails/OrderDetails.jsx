import React from 'react';

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
                                <OrderStoragePopup/>
                            </Popup>
                        </section>
                    )
                })
            }
        </div>
    )
}

const OrderStoragePopup = (props) => {
    const options = [
        'A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7',
        'B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7',
        'C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7',
        'D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7',
        'E1', 'E2', 'E3', 'E4', 'E5', 'E6', 'E7',
        'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7'
    ];

    const rowOptions = [
        'A', 'B', 'C', 'D', 'E', 'F'
    ];

    const columnOptions = [
        '1', '2', '3', '4', '5', '6', '7'
    ];

    return(
        <div>
            <span className={styles.storagePopup}>Choose storage section:</span>
            <select>
                {
                    rowOptions.map((option) => {
                        return(
                            <option>{option}</option>
                        )
                    })
                }
            </select>
            <select>
                {
                    columnOptions.map((option) => {
                        return(
                            <option>{option}</option>
                        )
                    })
                }
            </select>
            <button>Confirm</button>
        </div>
    )
}

export default OrderDetails;