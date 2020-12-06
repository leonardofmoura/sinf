import styles from "./TabelHeader.module.css";

export default function TabelHeader(props) {
    return (
        <section className={styles.header}>
            {
                props.headers.map((header, index) => {
                    return (
                        <div className={styles.headerItem} key={index}>
                            {header}
                        </div>
                    )
                })
            }
        </section>
    )
}