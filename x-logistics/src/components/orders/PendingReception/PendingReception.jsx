import React, { useEffect, useState } from 'react';

import Tabel from '../../tabel/Tabel/Tabel';
import TabelHeader from '../../tabel/TabelHeader/TabelHeader';
import TabelRow from '../../tabel/TabelRow/TabelRow';
import TabelRowSubRow from '../../tabel/TabelRowSubRow/TabelRowSubRow';

import { sendJasminRequest } from '../../../jasmin/request';


const PendingReception = (props) => {
    const tableHeaders = ['ID', 'Supplier', 'Date'];
    const subTableHeaders = ['Item', 'Description', 'Quantity'];
    
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const itemsResponse = await sendJasminRequest('goodsReceipt/processOrders/1/1000?company=GXSA', 'GET');
            const ordersResponse = await sendJasminRequest('purchases/orders', 'GET');

            const uniqueOrdersToProcess = itemsResponse.data.map(item => item.sourceDocKey);
            const filteredOrders = ordersResponse.data.filter(item => uniqueOrdersToProcess.includes(item.naturalKey));

            setOrders(filteredOrders.map(order => {
                return {
                    data: [
                        order.naturalKey,
                        order.sellerSupplierPartyName,
                        order.documentDate,
                    ],
                    items: itemsResponse.data.filter(item => item.sourceDocKey === order.naturalKey).map(item => {
                        return [
                            item.item,
                            item.description,
                            item.quantity,
                        ]
                    }),
                }
            }));

        }

        fetchData();
    }, []);

    return (
        <Tabel>
            <TabelHeader headers={tableHeaders}/>
            {
                orders.map((order, index) => {
                    return(
                        <TabelRow
                            key={index}
                            subHeaders={subTableHeaders}
                            data={order.data}
                        >
                            {
                                order.items.map((item, index) => {
                                    return(
                                        <TabelRowSubRow
                                            data={item}
                                            key={index}
                                        />
                                    )
                                })
                            }
                        </TabelRow>
                    )
                })
            }
        </Tabel>
    )
};

export default PendingReception;