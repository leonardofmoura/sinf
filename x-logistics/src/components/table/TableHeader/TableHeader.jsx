import styles from "./TableHeader.module.css";

export default function tableHeader(props) {
    const itemWidth = (1 / props.headers.length) * 100 + "%";

    return (
        <section className={styles.header}>
            {
                props.headers.map((header, index) => {
                    return (
                        <div className={styles.headerItem} style={{width: itemWidth}} key={index}>
                            {header}
                        </div>
                    )
                })
            }
        </section>
    )
}