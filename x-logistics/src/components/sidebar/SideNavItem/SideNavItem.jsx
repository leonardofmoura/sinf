import {Link} from "react-router-dom";
import React from "react";

import styles from './SideNavItem.module.css';

export default function NavItem(props) {
    function handleClick() {
        const { path, onItemClick } = props;
        onItemClick(path);
    }
    const { active } = props;

    return (
        <Link className={active ? styles.activeItem : styles.inactiveItem} to={props.path} onClick={handleClick}>
            {props.title}
        </Link>
    );

}