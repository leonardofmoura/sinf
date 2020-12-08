import {useState} from "react";
import React from "react";
import styles from "./PickingAction.module.css";
import Checkbox from '@material-ui/core/Checkbox';
import { Collapse } from 'react-collapse';
import { Form } from "react-bootstrap";

export default function PickingAction(props) {
    const [isExpanded, setExpanded] = useState(false);
    const [isChecked, setChecked] = useState(false);

    let maxQuantity = props.maxValue.substr(0, props.maxValue.length-3);
    let pickingQuantity = 1;

    const handleCheck = () => {
        isChecked ? props.onUnpick() : props.onPick(pickingQuantity);
        setExpanded(!isExpanded);
        setChecked(!isChecked);  
    }

    const handleQuantityChange = (event) => {
        pickingQuantity = parseInt(event.target.value);
        props.onPick(pickingQuantity);
    }

    return (
        <div className={styles.pickingSection}>
            <Checkbox 
                checked={isChecked}
                onChange={handleCheck}
                classes={{ root: styles.checkbox }}
                />
            <Collapse isOpened={isExpanded}>
                <div className={styles.inputSection}>
                    <Form.Label htmlFor="quantity" className={styles.label}>Quantity:</Form.Label>
                    <input className={styles.input} id="quantity" type="number" min="1" max={maxQuantity} onChange={handleQuantityChange} />
                </div>
            </Collapse>
        </div>
    )
}