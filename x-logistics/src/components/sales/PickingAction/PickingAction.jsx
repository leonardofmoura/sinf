import {useState} from "react";
import styles from "./PickingAction.module.css";
import Checkbox from '@material-ui/core/Checkbox';

export default function PickingAction(props) {
    const [checked, setChecked] = useState(false);

    let pickingQuantity = 0;

    function handleCheck() {
        setChecked(!checked);
        props.onPick();
    }

    return (
        <Checkbox 
            checked={checked}
            onChange={handleCheck}
            classes={{
                root: styles.checkbox,
            }}
        />
    )
}