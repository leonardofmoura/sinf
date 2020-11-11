import React from 'react';
import { Navbar } from 'react-bootstrap';

import styles from './TopBar.module.css';

const TopBar = () => (
    <Navbar expand="lg" className={styles.header}>
        <Navbar.Brand href='\' className={styles.brandName}>X Technology Lda</Navbar.Brand>
    </Navbar>
)

export default TopBar;
