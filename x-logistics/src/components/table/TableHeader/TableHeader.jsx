import styles from "./TableHeader.module.css";

export default function tableHeader(props) {
	const itemWidth = (1 / props.headers.length) * 100 + "%";
	
	return (
		<section className={styles.header}>
			{
				props.headers.map((header, index) => {
					const isLastItem = index === props.headers.length - 1;
					if (props.reorderProperties && props.reorderProperties.length > index)//maybe add skip option
						if (props.orderSelected[1] === props.reorderProperties[index])
							return (
								<div className={isLastItem && props.center ? styles.lastItem : styles.headerItem}
										 style={{width: itemWidth}} key={index}
										 onClick={(e) => props.parent.reorder(props.reorderProperties[index])}
										 className={styles.clickable}>
									{header} {props.orderSelected[0] ? <i className="bi bi-arrow-up"/> :
									<i className="bi bi-arrow-down"/>}
								</div>
							)
						else return (
							<div className={isLastItem && props.center ? styles.lastItem : styles.headerItem}
									 style={{width: itemWidth}} key={index}
									 onClick={(e) => props.parent.reorder(props.reorderProperties[index])}
									 className={styles.clickable}>
								{header}
							</div>
						)
					else
						return (
							<div className={isLastItem && props.center ? styles.lastItem : styles.headerItem}
									 style={{width: itemWidth}} key={index}>
								{header}
							</div>
						)
				})
			}
		</section>
	)
}