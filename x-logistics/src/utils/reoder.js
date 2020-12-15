const reorder = (target, items, reversed) => {
	const sorted = [...items].sort((a, b) => {
		let aCompare = a[target], bCompare = b[target]
		return baseReorder(target, aCompare, bCompare, reversed)
	})
	return sorted
}

const reorderDoubleArray = (target, items, reversed, index) => {
	const sorted = [...items].sort((a, b) => {
		let aCompare = a[index][target], bCompare = b[index][target]
		return baseReorder(target, aCompare, bCompare, reversed)
	})
	return sorted
}

const baseReorder = (target, aCompare, bCompare, reversed) => {
	if (target === "naturalKey"||((target === "id"||target===0 )&& ("" + aCompare).split(".").length===3)) {//document id
		aCompare = parseInt(aCompare.split(".")[2])
		bCompare = parseInt(bCompare.split(".")[2])
	} else if (target === 2 && ("" + aCompare).split(" ").length === 2 && aCompare.split(" ")[1]===("(UN)")) {//units
		aCompare = parseInt(aCompare.split(" ")[0])
		bCompare = parseInt(bCompare.split(" ")[0])
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
}
export {reorder, reorderDoubleArray}