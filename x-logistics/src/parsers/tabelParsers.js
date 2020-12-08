const parseProduct = (product) => {
    return [product.id, product.quantity, product.name, product.category];
}

const parsePendingPackagingProduct = (product) => {
    return [product.id, product.quantity, product.name, product.category, product.status];
}

const parseSaleInfo = (saleInfo) => {
    return [saleInfo.id, saleInfo.customer, saleInfo.date, saleInfo.summary];
}

export { parseProduct, parsePendingPackagingProduct, parseSaleInfo }