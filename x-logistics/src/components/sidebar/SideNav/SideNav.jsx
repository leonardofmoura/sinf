import React, {useState} from "react";
import SideNavItem from "../SideNavItem/SideNavItem";
import EuroIcon from '@material-ui/icons/Euro';
import SwapVertIcon from '@material-ui/icons/SwapVert';
import ListIcon from '@material-ui/icons/List';
import AssignmentIcon from '@material-ui/icons/Assignment';

import styles from './SideNav.module.css';

export default function SideNav(props) {
    const [activePath, setActivePath] = useState(props.location.pathname);
    const [navItems] = useState([
        {
            path: '/inventory/list',
            title:'Inventory',
            icon: <ListIcon />,
            key: 1
        },
        {
            path: '/orders/pending_reception',
            title:'Orders',
            icon: <AssignmentIcon />,
            key: 2
        },
        {
            path: '/sales/pending_picking',
            title:'Sales',
            icon: <EuroIcon/>,
            key: 3
        },
        {
            path: '/transactions/purchases',
            title:'Transactions',
            icon: <SwapVertIcon />,
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
                            key={item.key}
                            icon={item.icon}/>
                    )
                })
            }
        </div>
    );
}