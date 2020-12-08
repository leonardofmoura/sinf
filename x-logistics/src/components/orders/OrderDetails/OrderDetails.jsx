import React, { useState } from 'react';

import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

import { sendJasminRequest } from '../../../jasmin/request';
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
                props.items.map((item,index) => {
                    return(
                        <section key={index} className={styles.orderDetailsItem}>
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
                                <OrderStoragePopup order={props.order} item={item}/>
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
        const body = {
            documentType: 'GMA',
            serie: props.order.serie,
            seriesNumber: props.order.seriesNumber,
            loadingPoint: 'RECEPTION',
            loadingStreetName: 'Dr. Roberto Frias',
            loadingBuildingNumber: '1',
            loadingPostalZone: '4200-465',
            loadingCityName: 'Porto',
            loadingDateTime: new Date().getTimezoneOffset(),
            unloadingDateTime: new Date().getTimezoneOffset(),
            isATDocCodeIDEditable: false, // ???
            loadingCountry: 'PT',
            documentDate: new Date().toString(),
            company: 'GXSA',
            sourceWarehouse: 'RECEPTION',
            targetWarehouse: selectedRow + selectedCol,
            useCurrentDate: true,
            documentLines: [
                {
                    description: props.item.description,
                    quantity: props.item.quantity,
                    unit: props.item.unit,
                    item: props.item.purchasesItem,
                }
            ],
        };
        console.log(props.item);
        
        const response = sendJasminRequest(
            `materialsManagement/stockTransferOrders`,
            'POST',
            body,
            );

        console.log('RESPONSE: ');
        console.log(response);
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
            <button onClick = {_confirmItemStorage}>Confirm</button>
        </div>
    )
};

export default OrderDetails;