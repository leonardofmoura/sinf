import { sendJasminRequest } from "./request";
const moment = require('moment');

const getAllSales = async () => {
    const resource = "sales/orders";
    let sales = []; 

    const response = await sendJasminRequest(resource, "get");

    for (const sale of response.data) {
        // Sale Info
        let saleId = sale.serie + ":" + ("" + sale.seriesNumber).padStart(4, "0");
        let saleCustomer = sale.buyerCustomerParty;
        let saleDate = moment(sale.documentDate).format("YYYY-MM-DD");
        
        let saleInfo = [saleId, saleCustomer, saleDate, "TODO"];
        
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
        
        let parsedSale = {saleInfo: saleInfo, products: products};
        
        sales.push(parsedSale);
    }
    
    return sales;
}

const getSalesItem = async (salesItemId) => {
    let response = await sendJasminRequest("salesCore/salesItems/" + salesItemId);
    return response.data;
}

export { getAllSales };