import React from 'react';

import styles from './OrdersHeader.module.css';

export default function OrdersHeader(props) {
    return (
        <section className={styles.ordersListHeader}>
            <div>ID</div>
            <div>Supplier</div>
            <div>Date</div>
            <div>Summary</div>
        </section>
    )
}