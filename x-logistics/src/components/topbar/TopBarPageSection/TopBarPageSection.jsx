import React from 'react';

import styles from './TopBarPageSection.module.css';

const TopBarPageSection = (props) => (
    <section className={styles.pageSection}>
        {props.children}    
    </section>
)

export default TopBarPageSection;
