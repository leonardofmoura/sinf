import styles from "./Tabel.module.css";

export default function Tabel(props) {
    return (
        <section className={styles.tabel}>
            {props.children}
        </section>
    )
}