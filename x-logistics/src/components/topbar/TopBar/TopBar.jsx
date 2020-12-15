import React from 'react';
import { Navbar } from 'react-bootstrap';
import { companyName } from "../../../jasmin/companyInfo";
import styles from './TopBar.module.css';

const TopBar = () => (
    <Navbar expand="lg" className={styles.header}>
        <Navbar.Brand href='\' className={styles.brandName}>{companyName}</Navbar.Brand>
    </Navbar>
)

export default TopBar;
