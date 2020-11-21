import React, { useState } from 'react';

import OrderDetails from '../OrderDetails/OrderDetails';

import styles from './OrderItem.module.css';

export default function OrderItem(props) {
    const [expanded, setExpanded] = useState(false);

    return(
        <div>
            <section className={styles.orderItem}>
                <div>{props.order.id}</div>
                <div>{props.order.supplier}</div>
                <div>{props.order.date}</div>
                <div>{props.order.summary}</div>
                <button onClick={ () => setExpanded(!expanded) }>
                    +
                </button>
            </section>
            { expanded && <OrderDetails items={props.order.items}/> }
        </div>
    )
}