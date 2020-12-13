import React, {useState} from "react";
import SideNavItem from "../SideNavItem/SideNavItem";

import styles from './SideNav.module.css';

export default function SideNav(props) {
    const [activePath, setActivePath] = useState(props.location.pathname);
    const [navItems] = useState([
        {
            path: '/inventory/list',
            title:'Inventory',
            key: 1
        },
        {
            path: '/orders/pending_reception',
            title:'Orders',
            key: 2
        },
        {
            path: '/sales/pending_picking',
            title:'Sales',
            key: 3
        },
        {
            path: '/transactions/purchases',
            title:'Transactions',
            key: 4
        },
    ]);

    function onItemClick(path) {
        setActivePath(path);
    }

    function isActive(path) {
        let currentPathStr = activePath.substring(0, 1+activePath.substr(1).indexOf("/"));
        let pathStr = path.substring(0, 1+path.substr(1).indexOf("/"));
        return (currentPathStr === "" && activePath === path) || (currentPathStr !== "" && currentPathStr === pathStr);
    }

    return (
        <div className={styles.sideBar}>
            {
                navItems.map((item) => {
                    return (
                        <SideNavItem path={item.path} onItemClick={() => onItemClick(item.path)} title={item.title}
                            active={isActive(item.path)}
                            className={styles.sidebarItem}
                            key={item.key}/>
                    )
                })
            }
        </div>
    );
}