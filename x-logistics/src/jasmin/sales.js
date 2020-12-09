import { sendJasminRequest } from "./request";
import WAREHOUSE from "./warehouse";
const moment = require('moment');

const getAllSales = async () => {
    const resource = "sales/orders";
    let sales = []; 

    const response = await sendJasminRequest(resource, "get");

    for (const sale of response.data) {
        
        let products = [];
        for (const product of sale.documentLines) {
            let salesItem = await getSalesItem(product.salesItemId);
            
            let parsedProduct = {
                id: product.salesItemId,
                quantity:  product.quantity,
                unit: product.unit,
                name:  product.salesItemDescription, 
                category: salesItem.assortmentDescription,
                warehouse: product.warehouse,
                isInPickingWave: false,
                waveQuantity: 0,
            };
            
            products.push(parsedProduct);
        }
        
        let saleInfo = {
            id: sale.serie + ("" + sale.seriesNumber).padStart(4, "0"),
            customer: sale.buyerCustomerParty,
            date: moment(sale.documentDate).format("YYYY-MM-DD"),
        };
        
        let parsedSale = {info: saleInfo, products: products};
        
        sales.push(parsedSale);
    }
    
    return sales;
}

const getSalesItem = async (salesItemId) => {
    let response = await sendJasminRequest("salesCore/salesItems/" + salesItemId);
    return response.data;
}

const isPendingPicking = (product) => {
    return product.warehouse !== WAREHOUSE.RECEPTION && product.warehouse !== WAREHOUSE.SHIPPING
}

const isPendingPackaging = (product) => {
    return product.warehouse === WAREHOUSE.SHIPPING;
}

const getPendingPicking = async () => {
    let pendingPicking = [];

    const allSales = await getAllSales();

    for (const sale of allSales) {
        let pendingPickingProducts = [];

        for (const product of sale.products) {
           
            if (isPendingPicking(product)) {
                pendingPickingProducts.push(product);
            }
        }

        if (pendingPickingProducts.length > 0) {
            let pendingPickingSale = {info: sale.info, products: pendingPickingProducts};
            pendingPicking.push(pendingPickingSale);
        }
    }

    return pendingPicking;
}

const getPendingPackaging = async () => {
    let pendingPackaging = [];

    const allSales = await getAllSales();

    for (const sale of allSales) {
        let pendingProducts = [];
        let hasPickedProducts = false;

        for (const product of sale.products) {

            if (isPendingPackaging(product)) {
                product.packagingStatus = true; // is ready to package
                pendingProducts.push(product);
                hasPickedProducts = true;
            } else if (isPendingPicking(product)) {
                product.packagingStatus = false; // is pending picking
                pendingProducts.push(product);
            }
        }

        if (pendingProducts.length > 0 && hasPickedProducts) {
            pendingPackaging.push(sale);
        }
    }

    return pendingPackaging;
}

export { getAllSales, getPendingPicking, getPendingPackaging };