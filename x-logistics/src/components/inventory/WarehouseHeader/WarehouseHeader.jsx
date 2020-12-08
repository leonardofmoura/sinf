import styles from './WarehouseHeader.module.css';

const WarehouseHeader = (props) => {
    return (
        <h1 className={styles.warehouseHeader}>Warehouse: {props.warehouseName}</h1>
    );
}

export default WarehouseHeader;