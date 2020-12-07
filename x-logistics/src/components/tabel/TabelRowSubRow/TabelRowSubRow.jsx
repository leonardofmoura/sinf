import React from "react";
import styles from "./TabelRowSubRow.module.css";

export default function TabelRowSubRow(props) {
    const renderActionComponent = () => {
        if (props.actionComponent !== undefined)
            return (
                <div className={styles.rowItem}>
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
                            <div className={styles.rowItem} key={index}>
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