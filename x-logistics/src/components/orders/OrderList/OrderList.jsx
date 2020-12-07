import React, { useState, useEffect } from 'react';

import { setAutoToken } from '../../../jasmin/token';
import { sendJasminRequest } from '../../../jasmin/request';

import OrderItem from '../OrderItem/OrderItem';
import styles from './OrderList.module.css';

const OrderList = (props) => {
    const [items, setItems] = useState([]);

    //axios
    setAutoToken();

    useEffect(() => {
        const fetchData = async () => {
            const json = await sendJasminRequest('purchases/orders', 'GET');
            setItems(json.data);
        };

        fetchData();
    }, []);

    console.log('BEFORE RENDERS:');
    console.log(items);

    if (items.length === 0) {
        console.log('Returning null');
        return null;
    }

    return (
        <div className={styles.orderListContent}>
            {console.log('BEFORE MAP:')}
            {console.log(items)}
            {
                items.map((item) => {
                    return (
                        <OrderItem order={item}/>
                    )
                })
            }
        </div>
    );
}

export default OrderList;