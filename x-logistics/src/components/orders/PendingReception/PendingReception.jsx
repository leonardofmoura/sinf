import React, { useEffect, useState, Button } from 'react';

import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

import Table from '../../table/Table/Table';
import TableHeader from '../../table/TableHeader/TableHeader';
import TableRow from '../../table/TableRow/TableRow';
import TableRowSubRow from '../../table/TableRowSubRow/TableRowSubRow';

import { sendJasminRequest } from '../../../jasmin/request';
import Loader from '../../utils/Loader';

const PendingReception = (props) => {
    const tableHeaders = ['ID', 'Supplier', 'Date'];
    const subTableHeaders = ['Item', 'Description', 'Quantity', 'Reception'];

    const [orders, setOrders] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const itemsResponse = await sendJasminRequest('goodsReceipt/processOrders/1/1000?company=GXSA', 'GET');
            const ordersResponse = await sendJasminRequest('purchases/orders', 'GET');

            const uniqueOrdersToProcess = itemsResponse.data.map(item => item.sourceDocKey);
            const filteredOrders = ordersResponse.data.filter(item => uniqueOrdersToProcess.includes(item.naturalKey));

            console.log('ITEMS:'); console.log(itemsResponse);

            setOrders(filteredOrders.map(order => {
                return {
                    data: [
                        order.naturalKey,
                        order.sellerSupplierPartyName,
                        order.documentDate,
                    ],
                    items: itemsResponse.data.filter(item => item.sourceDocKey === order.naturalKey).map(item => {
                        return {
                            tableData: [
                                item.item,
                                item.description,
                                item.quantity,
                            ],
                            requestData: {
                                item: item.item,
                                sourceDocLineNumber: item.sourceDocLineNumber,
                                quantity: item.quantity,
                            }
                        }
                    }),
                }
            }));

        }

        fetchData();
    }, []);

    const renderOrders = () => {
        if (orders === null) {
            return <Loader />
        } else if (orders.length > 0) {
            return (
                orders.map((order, index) => {
                    return (
                        <TableRow
                            key={index}
                            subHeaders={subTableHeaders}
                            data={order.data}
                        >
                            {
                                order.items.map((item, index) => {
                                    return(
                                        <TableRowSubRow
                                            data={item.tableData}
                                            key={index}
                                            actionComponent={
                                                <Popup trigger={open => (<button>Confirm</button>)} modal='true'>
                                                    <ConfirmReceptionPopup order={order.data} item={item}/>
                                                </Popup>}
                                        />
                                    )
                                })
                            }
                        </TableRow>
                    )
                })
            )
        } else if (orders.length === 0) {
            return ( <span>No orders found</span> )
        }
    }

    return (
        <Table>
            <TableHeader headers={tableHeaders}/>
            { renderOrders() }
        </Table>
    )
};

const ConfirmReceptionPopup = (props) => {
    console.log('ITEM SOURCE DOC LINE NUMBER: ');
    console.log(props.item.requestData.sourceDocLineNumber);

    const _confirmItemReception = async () => {
        const body = [
            {
                sourceDocKey: props.order[0],
                quantity: props.item.requestData.quantity,
                sourceDocLineNumber: props.item.requestData.sourceDocLineNumber,
            }
        ];

        const response = await sendJasminRequest(
            'goodsReceipt/processOrders/GXSA',
            'POST',
            body,
        );

        console.log('RESPONSE: ');
        console.log(response);
    }

    return(
        <div>
            <span>{`Do you wish to confirm reception of ${props.item.tableData[2]} ${props.item.tableData[0]}s of order ${props.order[0]}?`}</span>
            <button onClick={_confirmItemReception}>Confirm</button>
        </div>
    )
}

export default PendingReception;