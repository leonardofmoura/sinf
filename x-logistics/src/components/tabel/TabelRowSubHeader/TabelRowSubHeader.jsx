import React from "react";
import styles from "./TabelRowSubHeader.module.css";

export default function TabelRowSubHeader(props) {
    const itemWidth = (1 / props.headers.length) * 100 + "%";

    return (
        <React.Fragment>
            <div className={styles.header}>
                {
                    props.headers.map((header, index) => {
                        return (
                            <div className={styles.headerItem} style={{width: itemWidth}} key={index}>
                                {header}
                            </div>
                        )
                    })
                }
            </div>
            <hr className={styles.headerLine}></hr>
        </React.Fragment>
    )
}