import React from "react";
import { useState } from "react";
import {Collapse} from 'react-collapse';
import TabelRowSubHeader from "../TabelRowSubHeader/TabelRowSubHeader.jsx";
import styles from "./TabelRow.module.css";

export default function TabelRow(props) {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleClickRow = () => {
        setIsExpanded(!isExpanded);
    }

    return (
        <React.Fragment>
            <div className={isExpanded ? styles.tableRowExpanded : styles.tableRowCollapsed} onClick={handleClickRow}>
                {
                    props.data.map((item, index) => {
                        return (
                            <div className={styles.tableRowItem} key={index}>
                                {item}
                            </div>
                        )
                    })
                }
                <div className={styles.tableRowItem}>
                    {props.actionComponent}
                </div>
            </div>
            <Collapse isOpened={isExpanded}>
                <div className={styles.tabelRowExpansion}>
                    <TabelRowSubHeader headers={props.subHeaders} />
                    {props.children}
                </div>
            </Collapse>
        </React.Fragment>
    )
    
}