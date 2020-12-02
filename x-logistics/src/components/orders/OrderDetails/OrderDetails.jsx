import React from 'react';

import Popup from 'reactjs-popup';

import styles from './OrderDetails.module.css';

const OrderDetails = (props) => {
    console.log(props.items);

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
                            <div>???</div>
                            <div>{item.quantity}</div>
                            <div>{item.purchasesItemDescription}</div>
                            <div>???</div>
                            <Popup
                                trigger={open=> (
                                    <button>Confirm</button>
                                )}  
                                modal="true"
                                closeOnDocumentClick
                            >
                                <span>Popup content</span>
                            </Popup>
                        </section>
                    )
                })
            }
        </div>
    )
}

export default OrderDetails;