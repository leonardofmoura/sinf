import React, { useEffect, useState } from 'react';

import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

import Table from '../../table/Table/Table';
import TableHeader from '../../table/TableHeader/TableHeader';
import TableRow from '../../table/TableRow/TableRow';

import { sendJasminRequest } from '../../../jasmin/request';
import { getWarehouseItems } from '../../../jasmin/inventory';

import styles from './PendingStorage.module.css';
import Loader from '../../utils/Loader';

const PendingStorage = (props) => {
    const tableHeaders = ['ID', 'Name', 'Category', 'Quantity', 'Storage'];

    const [items, setItems] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await getWarehouseItems('RECEPTION');

            setItems(response.items.map(item => {
                return [
                    item.id,
                    item.name,
                    item.category,
                    item.stock,
                ]
            }))
        }

        fetchData();
    }, [])

    const renderItems = () => {
        if (items === null) {
            return <Loader />
        } else if (items.length > 0) {
            return (
                items.map((item, index) => {
                    return(
                        <TableRow
                            key={index}
                            data={item}
                            actionComponent={
                                <Popup trigger={open => (<button>Confirm</button>)} modal='true'>
                                    <ItemsStoragePopup item={item}/>
                                </Popup>}
                        />
                    )
                })
            )
        } else if (items.length === 0) {
            return <span>No orders found</span>
        }
    }

    return (
        <Table>
            <TableHeader headers={tableHeaders}/>
            { renderItems() }
        </Table>
    )
}

const ItemsStoragePopup = (props) => {
    const [selectedRow, setRow] = useState('A');
    const [selectedCol, setCol] = useState('1');

    const _handleRowChange = (event) => {
        setRow(event.target.value);
    }

    const _handleColChange = (event) => {
        setCol(event.target.value);
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
            sourceWarehouse: 'RECEPTION',
            targetWarehouse: selectedRow + selectedCol,
            documentLines: [
                {
                    quantity: props.item[3],
                    materialsItem: props.item[0],
                }
            ],
        };
        console.log(body);
        
        const response = await sendJasminRequest(
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

    return (
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

export default PendingStorage;