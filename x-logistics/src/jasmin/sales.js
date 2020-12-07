import { sendJasminRequest } from "./request";
const moment = require('moment');

const getAllSales = async () => {
    const resource = "sales/orders";
    let sales = []; 

    const response = await sendJasminRequest(resource, "get");

    for (const sale of response.data) {
        
        let products = [];
        for (const product of sale.documentLines) {
            let salesItem = await getSalesItem(product.salesItemId);
            
            let productId = product.salesItemId;
            let quantity = product.quantity + " " + product.unit;
            let productName = product.salesItemDescription;
            let category = salesItem.assortmentDescription;
            
            let parsedProduct = [productId, quantity, productName, category];
            
            products.push(parsedProduct);
        }

        // Sale Info
        let saleId = sale.serie + ":" + ("" + sale.seriesNumber).padStart(4, "0");
        let saleCustomer = sale.buyerCustomerParty;
        let saleDate = moment(sale.documentDate).format("YYYY-MM-DD");
        let summary = createSaleSummary(products);
        
        let saleInfo = [saleId, saleCustomer, saleDate, summary];
        
        let parsedSale = {saleInfo: saleInfo, products: products};
        
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
        let quantity = product[1].substring(0, product[1].length - 3);
        let category = product[3];
        
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

export { getAllSales };