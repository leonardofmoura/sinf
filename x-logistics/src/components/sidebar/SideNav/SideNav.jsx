import React, {useState} from "react";
import SideNavItem from "../SideNavItem/SideNavItem";

import styles from './SideNav.module.css';

export default function SideNav(props) {
    const [activePath, setActivePath] = useState(props.location.pathname);
    const [navItems] = useState([
        {
            path: '/inventory',
            title:'Inventory',
            key: 1
        },
        {
            path: '/orders',
            title:'Order List',
            key: 2
        },
        {
            path: '/sales',
            title:'Sale List',
            key: 3
        },
        {
            path: '/transactions',
            title:'Transactions',
            key: 4
        },
    ]);

    function onItemClick(path){
        setActivePath(path);
    }

    return (
        <div className={styles.sideBar}>
            {
                navItems.map((item) => {
                    return (
                        <SideNavItem path={item.path} onItemClick={onItemClick} title={item.title}
                            active={item.path === activePath}
                            className={styles["sidebar-item"]}
                            key={item.key}/>
                    )
                })
            }
        </div>
    );
}