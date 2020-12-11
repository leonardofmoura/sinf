const parseWaveInfo = (waveInfo) => {
    return [
        waveInfo.id, 
        waveInfo.createdOn, 
        waveInfo.summary
    ];
}

const parseWaveProduct = (product) => {
    return [
        product.id, 
        product.name, 
        product.category, 
        product.warehouse, 
        product.waveQuantity + " " + product.unit
    ];
}

export { parseWaveInfo, parseWaveProduct }; 