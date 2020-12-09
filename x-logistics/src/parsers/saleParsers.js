const parseProduct = (product) => {
    let quantity = "";

    if (product.isInPickingWave) {
        if (product.quantity <= 0) {
            quantity = product.waveQuantity + " " + product.unit + " in picking wave";
        } else {
            quantity = product.quantity + " " + product.unit;
            if (product.waveQuantity > 0) {
                quantity += " (+" + product.waveQuantity + " " + product.unit + " in picking wave)";
            }
        }
    } else {
        quantity = product.quantity + " " + product.unit;
    }

    return [product.id, quantity, product.name, product.category];
}

const parsePendingPackagingProduct = (product) => {
    return [product.id, product.quantity + " " + product.unit, product.name, product.category, product.status];
}

const parseSaleInfo = (sale) => {
    let saleInfo = sale.info;
    return [saleInfo.id, saleInfo.customer, saleInfo.date, createSaleSummary(sale.products)];
}

const createSaleSummary = (products) => {
    let summaryInfo = {};

    for (const product of products) {
        let quantity = product.quantity;
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

export { parseProduct, parsePendingPackagingProduct, parseSaleInfo }