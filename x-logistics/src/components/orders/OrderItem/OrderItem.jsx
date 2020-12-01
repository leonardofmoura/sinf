import React, { useState } from 'react';

import OrderDetails from '../OrderDetails/OrderDetails';

import styles from './OrderItem.module.css';

const OrderItem = (props) => {
    const [expanded, setExpanded] = useState(false);

    return(
        <div>
            <section className={styles.orderItem + (expanded ? ' ' + styles.expanded : ' ' + styles.notExpanded)}>
                <div>{props.order.serie}{props.order.seriesNumber}?</div>
                <div>{props.order.accountingPartyName}</div>
                <div>{props.order.documentDate.split('T')[0]}</div>
                <div>ups...</div>
                <button onClick={ () => setExpanded(!expanded) }>
                    +
                </button>
            </section>
            { expanded && <OrderDetails items={props.order.documentLines}/> }
        </div>
    )
};

export default OrderItem;