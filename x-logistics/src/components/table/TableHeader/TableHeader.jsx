import styles from "./TableHeader.module.css";

export default function tableHeader(props) {
	const itemWidth = (1 / props.headers.length) * 100 + "%";
	
	return (
		<section className={styles.header}>
			{
				props.headers.map((header, index) => {
					const isLastItem = index === props.headers.length - 1;
					const classes = `${isLastItem && props.center ? styles.lastItem : styles.headerItem} ${styles.clickable}`
					let tempFunction
					if (props.parent) tempFunction = props.parent.reorder
					else tempFunction = props.reorder
					if (props.reorderProperties && props.reorderProperties.length > index) {//maybe add skip option
						if (props.orderSelected[1] === props.reorderProperties[index])
							return (
								<div className={classes}
										 style={{width: itemWidth}} key={index}
										 onClick={(e) => tempFunction(props.reorderProperties[index])}
								>
									{header} {props.orderSelected[0] ? <i className="bi bi-arrow-up"/> :
									<i className="bi bi-arrow-down"/>}
								</div>
							)
						else return (
							<div className={classes}
									 style={{width: itemWidth}} key={index}
									 onClick={(e) => tempFunction(props.reorderProperties[index])}>
								{header}
							</div>
						)
					} else
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