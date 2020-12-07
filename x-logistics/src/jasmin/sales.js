import { sendJasminRequest } from "./request";

const getAllSales = async () => {
    const resource = "sales/orders"; 

    const response = await sendJasminRequest(resource, "get");

    const data = response.data;
    
    const sales = [];

    data.forEach(sale => {
        console.log(sale);

        let saleId = ("" + sale.seriesNumber).padStart(5, "0");
        let saleCustomer = sale.buyerCustomerParty;
        let saleDate = sale.documentDate;

        //let products = [];

        //sale.documentLines.forEach((product))


        console.log(sale.description);
    })
}

export { getAllSales };