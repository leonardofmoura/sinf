import { Link } from 'react-router-dom';
import styles from './ViewWarehouse.module.css';

const ViewWarehouse = (props) => {
    const isSection = props.id === "RECEPTION" || props.id === "SHIPPING";

    return (
        <Link to={`/inventory/section/${props.id}`} className={styles.viewWarehouse}>
            View {isSection ? "Section" : "Shelf"}
        </Link>
    )
}

export default ViewWarehouse;