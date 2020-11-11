import React from 'react';

import styles from './SidebarPageSection.module.css';

const SidebarPageSection = (props) => (
    <section className={styles.pageSection}>
        {props.children}
    </section>
)

export default SidebarPageSection;
