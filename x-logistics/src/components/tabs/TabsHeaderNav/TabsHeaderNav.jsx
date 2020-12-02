import React, {useState} from "react";
import { Link } from "react-router-dom";
import styles from "./TabsHeaderNav.module.css";

export default function TabsHeaderNav(props) {
    const [activePath, setActivePath] = useState(props.location.pathname);

    function onItemClick(path) {
        setActivePath(path);
    }

    return (
        <div className={styles.header}>
            {
                props.tabs.map((tab) => {
                    const active = activePath === tab.path;
                    return (
                        <Link to={tab.path} key={tab.key} className={active ? styles.activeItem : styles.inactiveItem} onClick={onItemClick}>
                            {tab.title}
                        </Link>
                    )
                })
            }
        </div>
    )

}