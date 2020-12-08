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

            console.log(product);
            
            let parsedProduct = {
                id: product.salesItemId,
                quantity:  product.quantity + " " + product.unit, 
                name:  product.salesItemDescription, 
                category: salesItem.assortmentDescription,
                warehouse: product.warehouse,
            };
            
            products.push(parsedProduct);
        }
        
        let saleInfo = {
            id: sale.serie + ":" + ("" + sale.seriesNumber).padStart(4, "0"),
            customer: sale.buyerCustomerParty,
            date: moment(sale.documentDate).format("YYYY-MM-DD"),
            summary: createSaleSummary(products),
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

const createSaleSummary = (products) => {
    let summaryInfo = {};

    for (const product of products) {
        let quantity = product.quantity.substring(0, product.quantity.length - 3);
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

const parseProduct = (product) => {
    return [product.id, product.quantity, product.name, product.category];
}

const parseSale = (sale) => {
    let saleInfo = sale.saleInfo;
    let parsedSaleInfo = [saleInfo.id, saleInfo.customer, saleInfo.date, saleInfo.summary];

    let parsedProducts = [];
    for (const product of sale.products) {
        parsedProducts.push(parseProduct(product));
    }

    return {info: parsedSaleInfo, products: parsedProducts};
}

const getPendingPicking = async () => {
    let pendingPicking = [];

    const allSales = await getAllSales();

    for (const sale of allSales) {
        let pendingPickingProducts = [];

        for (const product of sale.products) {
           
            if (product.warehouse !== WAREHOUSE.RECEPTION && product.warehouse !== WAREHOUSE.SHIPPING) {
                pendingPickingProducts.push(product);
            }
        }

        if (pendingPickingProducts.length > 0) {
            let pendingPickingSale = {saleInfo: sale.info, products: pendingPickingProducts};
            pendingPicking.push(parseSale(pendingPickingSale));
        }
    }

    return pendingPicking;
}

export { getAllSales, getPendingPicking };