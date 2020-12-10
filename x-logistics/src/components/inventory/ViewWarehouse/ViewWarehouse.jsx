import { Link } from 'react-router-dom';
import styles from './ViewWarehouse.module.css';

const ViewWarehouse = (props) => {
    return (
        <Link to={`/warehouses/${props.id}`} className={styles.viewWarehouse}>
            View Warehouse
        </Link>
    )
}


export default ViewWarehouse;