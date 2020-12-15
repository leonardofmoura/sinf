import { Link } from 'react-router-dom';
import styles from './ViewWarehouse.module.css';
import Button from '@material-ui/core/Button';

const ViewWarehouse = (props) => {
    const isSection = props.id === "RECEPTION" || props.id === "SHIPPING";

    return (
        <Link to={`/inventory/section/${props.id}`} className={styles.viewWarehouse}>
            <Button className={styles.viewWarehouse}>
                View {isSection ? "Section" : "Shelf"}
            </Button>
        </Link>
    )
}

export default ViewWarehouse;