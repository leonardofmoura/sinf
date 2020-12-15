const reorder = (target, items, reversed) => {
	const sorted = [...items].sort((a, b) => {
		let aCompare = a[target], bCompare = b[target]
		if (target === "naturalKey") {
			aCompare = parseInt(aCompare.split(".")[2])
			bCompare = parseInt(bCompare.split(".")[2])
		}
		if (reversed) {
			if (aCompare < bCompare)
				return -1
			if (aCompare > bCompare)
				return 1
		} else {
			if (aCompare < bCompare)
				return 1
			if (aCompare > bCompare)
				return -1
		}
		return 0
	})
	return sorted
}

export {reorder}