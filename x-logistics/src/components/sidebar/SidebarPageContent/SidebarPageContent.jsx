import React from 'react';

import styles from './SidebarPageContent.module.css';

const SidebarPageContent = (props) => (
    <section className={styles.pageContent}>
        {props.children}
    </section>
)

export default SidebarPageContent;
