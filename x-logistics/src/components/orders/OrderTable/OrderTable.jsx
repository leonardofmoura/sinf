import React from 'react';

import OrdersHeader from '../OrdersHeader/OrdersHeader';
import OrderList from '../OrderList/OrderList';

import styles from './OrderTable.module.css';

export default function OrderTable(props) {
    return(
        <section className={styles.orderTable}>
            <OrdersHeader/>
            <OrderList/>
        </section>
    )
}