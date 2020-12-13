import React, {useState} from "react";
import { Link } from "react-router-dom";
import styles from "./TabsHeaderNav.module.css";

export default function TabsHeaderNav(props) {
    const [activePath, setActivePath] = useState(props.location.pathname);

    function onItemClick(event) {
        setActivePath(event.target.pathname);
    }

    return (
        <div className={styles.header}>
            {
                props.tabs.map((tab) => {
                    const active = activePath === tab.path || (activePath.toString().substr(0,22)===tab.path.toString().substr(0,22) && tab.key===3 && tab.path==="/transactions/internals/receptions");
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