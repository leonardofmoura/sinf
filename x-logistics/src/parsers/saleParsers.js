const parsePendingPickingProduct = (product) => {
    return [
        product.nameId, 
        product.name, 
        product.category, 
        product.saleQuantity + " (" + product.unit + ")", 
        product.waveQuantity + " (" + product.unit + ")", 
        product.pickedQuantity + " (" + product.unit + ")"
    ];
}

const parsePendingPackagingProduct = (product) => {
    return [
        product.nameId, 
        product.name, 
        product.category, 
        product.saleQuantity + " (" + product.unit + ")", 
        product.pickedQuantity + " (" + product.unit + ")",
    ];
}

const parseCompleteProduct = (product) => {
    return [
        product.nameId, 
        product.name, 
        product.category, 
        product.saleQuantity + " (" + product.unit + ")", 
    ];
}

const parseSaleInfo = (sale) => {
    let saleInfo = sale.info;
    return [
        saleInfo.id, 
        saleInfo.customer, 
        saleInfo.date, 
        createSaleSummary(sale.products)
    ];
}

const createSaleSummary = (products) => {
    let summaryInfo = {};

    for (const product of products) {
        let quantity = product.saleQuantity;
        let category = product.category;
        
        if (category === null) {
            continue;
        }

        if (summaryInfo.hasOwnProperty(category)) {
            summaryInfo[category] += parseInt(quantity);  
        } else {
            summaryInfo[category] = parseInt(quantity);
        }
    }

    let saleSummary = "";
    let maxItems = 2;
    let i = 0;
    for (const key in summaryInfo) {
        if (i >= maxItems) {
            break;
        }

        saleSummary += summaryInfo[key] + " " + key + "; ";
        i++;
    }

    return saleSummary;
}

export { 
    parsePendingPickingProduct, 
    parsePendingPackagingProduct, 
    parseCompleteProduct,
    parseSaleInfo 
}