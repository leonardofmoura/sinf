const parseWaveInfo = (waveInfo) => {
    return [waveInfo.id, waveInfo.createdOn, waveInfo.summary];
}

const parseWaveProduct = (productInfo) => {
    let product = productInfo.product;
    return [product.id, product.name, product.category, product.warehouse, productInfo.quantity];
}

export { parseWaveInfo, parseWaveProduct }; 