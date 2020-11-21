import React from 'react';

import styles from './OrderDetails.module.css';


export default function OrderDetails(props) {
    return (
        <div className={styles.orderDetailsSection}>
            <section className={styles.orderDetailsHeader}>
                <div>Product ID</div>
                <div>Quantity</div>
                <div>Item name</div>
                <div>Category</div>
                <div>Storage</div>
            </section>
            {
                props.items.map((item) => {
                    return(
                        <section className={styles.orderDetailsItem}>
                            <div>{item.productId}</div>
                            <div>{item.quantity}</div>
                            <div>{item.itemName}</div>
                            <div>{item.category}</div>
                            <button>Confirm</button>
                        </section>
                    )
                })
            }
        </div>
    )
}