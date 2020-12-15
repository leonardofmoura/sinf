import {Link} from "react-router-dom";
import React from "react";

import styles from './SideNavItem.module.css';
import { Button } from "@material-ui/core";

export default function NavItem(props) {
    function handleClick() {
        const { path, onItemClick } = props;
        onItemClick(path);
    }
    const { active } = props;

    return (
        <Link className={active ? styles.activeItem : styles.inactiveItem} to={props.path} onClick={handleClick}>
            <Button startIcon={props.icon} size="medium"z styles={{width: "100%"}}>
                {props.title}
            </Button>
        </Link>
    );

}