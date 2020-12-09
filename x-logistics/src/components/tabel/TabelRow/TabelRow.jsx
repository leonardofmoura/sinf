import React from "react";
import { useState } from "react";
import {Collapse} from 'react-collapse';
import TabelRowSubHeader from "../TabelRowSubHeader/TabelRowSubHeader.jsx";
import styles from "./TabelRow.module.css";

export default function TabelRow(props) {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleClickRow = () => {
        if (props.subHeaders && props.children.length > 0) {
            setIsExpanded(!isExpanded);
        }
    }

    const showActionComponent = () => {
        if (props.actionComponent) {
            return (
                <div className={styles.tableRowItem}>
                    {props.actionComponent}
                </div>
            );
        }
    }

    const showSubTable = () => {
        if (props.subHeaders && props.children.length > 0) {
            return (
                <Collapse isOpened={isExpanded}>
                    <div className={styles.tabelRowExpansion}>
                        <TabelRowSubHeader headers={props.subHeaders} />
                        {props.children}
                    </div>
                </Collapse>
            );
        }
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
                {showActionComponent()}
            </div>
            {showSubTable()}
        </React.Fragment>
    )
    
}