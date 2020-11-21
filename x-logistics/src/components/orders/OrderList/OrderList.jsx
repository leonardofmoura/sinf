import React from 'react';

import OrderItem from '../OrderItem/OrderItem';

import styles from './OrderList.module.css';

export default function OrderList(props) {
    // hard coded for now
    const orders = [
        {
            id: '0000001',
            supplier: 'NVIDIA Inc',
            date: '11/11/2020',
            summary: '37 2080 Ti Graphics Cards',
            items: [
                {
                    productId: '0000001',
                    quantity: 37,
                    itemName: 'NVIDIA 2080 Ti',
                    category: 'Graphics card',
                },
            ]
        },
        {
            id: '0000002',
            supplier: 'NVIDIA Inc',
            date: '12/11/2020',
            summary: '2080 Ti Graphics Cards',
            items: [
                {
                    productId: '0000001',
                    quantity: 20,
                    itemName: 'NVIDIA 2080 Ti',
                    category: 'Graphics card',
                },
            ]
        }
    ];

    return (
        <div className={styles.orderListContent}>
            {
                orders.map((item) => {
                    return (
                        <OrderItem order={item}/>
                    )
                })
            }
        </div>
    )
}