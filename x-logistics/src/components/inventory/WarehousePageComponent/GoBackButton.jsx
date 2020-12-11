import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styles from './GoBackButton.module.css';

const GoBackButton = (props) => {
    return (
        <Link to={props.url} className={styles.goBackButton}>
            <Button>Go back</Button>
        </Link>
    )
}


export default GoBackButton;