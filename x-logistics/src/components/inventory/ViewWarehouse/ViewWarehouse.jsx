import { Link } from 'react-router-dom';
import styles from './ViewWarehouse.module.css';

const ViewWarehouse = () => {
    return (
        <Link to="/inventory/warehouse-page?id=3cd84e21-d727-41ee-9880-d3b6341a425a" className={styles.viewWarehouse}>
            View Warehouse
        </Link>
    )
}


export default ViewWarehouse;