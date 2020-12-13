import styles from "./Table.module.css";

export default function table(props) {
    return (
        <section className={styles.table}>
            {props.children}
        </section>
    )
}