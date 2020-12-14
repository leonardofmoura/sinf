import React from "react";
import { useState } from "react";
import { Collapse } from 'react-collapse';
import TableRowSubHeader from "../TableRowSubHeader/TableRowSubHeader.jsx";
import styles from "./TableRow.module.css";

export default function TableRow(props) {
    const [isExpanded, setIsExpanded] = useState(false);
    const itemWidth = (1 / (props.data.length + props.actionComponent !== undefined ? 1 : 0)) * 100 + "%";

    const handleClickRow = () => {
        if (props.subHeaders && props.children.length > 0) {
            setIsExpanded(!isExpanded);
        }
    }

    const showActionComponent = () => {
        if (props.actionComponent) {
            return (
                <div className={styles.tableRowItem} style={{width: itemWidth}}>
                    {props.actionComponent}
                </div>
            );
        }
    }

    const showSubTable = () => {
        if (props.subHeaders && props.children.length > 0) {
            return (
                <Collapse isOpened={isExpanded}>
                    <div className={styles.tableRowExpansion}>
                        <TableRowSubHeader headers={props.subHeaders} />
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
                        const isLastItem = index === props.data.length - 1;
                        return (
                            <div className={(isLastItem && props.center) ? styles.centered : styles.tableRowItem} style={{width: itemWidth}} key={index}>
                                <span>{item}</span>
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