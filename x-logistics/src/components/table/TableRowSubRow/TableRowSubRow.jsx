import React from "react";
import styles from "./TableRowSubRow.module.css";

export default function tableRowSubRow(props) {
    const numItems = props.data.length + (props.actionComponent !== undefined ? 1 : 0);
    const itemWidth = (1 / numItems) * 100 + "%";

    const renderActionComponent = () => {
        if (props.actionComponent !== undefined)
            return (
                <div className={styles.rowItem} style={{width: itemWidth}}>
                    {props.actionComponent}
                </div>
            )
        else return (<span></span>)
    }

    return (
        <React.Fragment>
            <div className={styles.row}>
                {
                    props.data.map((header, index) => {
                        return (
                            <div className={styles.rowItem} style={{width: itemWidth}} key={index}>
                                {header}
                            </div>
                        )
                    })
                }
                {
                    renderActionComponent()
                }
            </div>
        </React.Fragment>
    )
}