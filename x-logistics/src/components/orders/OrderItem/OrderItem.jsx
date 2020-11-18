import React from 'react';

import styles from './OrderItem.module.css';

export default function OrderItem(props) {
    return(
        <section className={styles.orderItem}>
            <div>{props.order.id}</div>
            <div>{props.order.supplier}</div>
            <div>{props.order.date}</div>
            <div>{props.order.summary}</div>
        </section>
    )
}