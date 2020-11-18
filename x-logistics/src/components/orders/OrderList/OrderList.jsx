import React from 'react';
import styles from './OrderList.module.css';

export default function OrderList(props) {
    // hard coded for now
    const orders = [
        {
            id: '0000001',
            supplier: 'NVIDIA Inc',
            date: '11/11/2020',
            summary: '37 2080 Ti Graphics Cards',
        },
        {
            id: '0000002',
            suppler: 'NVIDIA Inc',
            date: '12/11/2020',
            summary: '2080 Ti Graphics Cards',
        }
    ];

    return (
        <div className={styles.orderListContent}>
            {
                orders.map((item) => {
                    return (
                        <div>{item.id}</div>
                    )
                })
            }
        </div>
    )
}