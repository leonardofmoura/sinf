import styles from './WarehouseHeader.module.css';

const WarehouseHeader = (props) => {
    return (
        <div className={styles.warehouseHeader}>
            <h1 className={styles.info}>
                Warehouse: {props.warehouseName}
            </h1>
            <h1 className={styles.info}>
                Description: {props.description}
            </h1>
            <h1 className={styles.info}>
                Total Stock:{props.stock}
            </h1>
        </div>
    );
}

export default WarehouseHeader;