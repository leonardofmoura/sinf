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
            /*const token = await getToken();
            
            console.log('JSON:');
            console.log(json);

            const options = {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            };

            const response = await fetch('https://my.jasminsoftware.com/api/242853/242853-0001/purchases/orders', options)
                .catch((error) => {
                    console.error(error);
                });

            const responseJson = await response.json();*/

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