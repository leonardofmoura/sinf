import { companyAddress, companyName } from "./companyInfo";
import { getMaterialsItem } from "./inventory";
import { sendJasminRequest } from "./request";
import { WAREHOUSE } from "./warehouse";
import { warehouseIndex } from "./warehouse";

const moment = require('moment');

const getAllSales = async () => {
    const resource = "sales/orders";
    let sales = []; 

    const response = await sendJasminRequest(resource, "get");

    for (const sale of response.data) {

        console.log(sale);
        
        let products = [];
        for (const product of sale.documentLines) {

            if (product.itemTypeDescription  === "Service") {
                continue;
            }

            let salesItem = await getSalesItem(product.salesItemId);
            
            let parsedProduct = {
                id: product.salesItemId,
                name:  product.salesItemDescription, 
                nameId: product.salesItem,
                itemKey: salesItem.itemKey,
                category: salesItem.assortmentDescription,
                index: product.index,

                saleQuantity:  product.quantity,
                deliveredQuantity: product.deliveredQuantity,
                waveQuantity: getWaveQuantity(product.salesItemId),
                pickedQuantity: await getPickedQuantity(salesItem.itemKey),
                unit: product.unit,

                warehouse: product.warehouse,

                isInPickingWave: false,
                packagingStatus: false,
            };
            
            products.push(parsedProduct);
        }
        
        let saleInfo = {
            id: sale.serie + ("" + sale.seriesNumber).padStart(4, "0"),
            jasminId: sale.id,
            key: sale.naturalKey,
            customer: sale.buyerCustomerPartyDescription,
            date: moment(sale.documentDate).format("YYYY-MM-DD"),
        };
        
        let parsedSale = {info: saleInfo, products: products};
        
        sales.push(parsedSale);
    }
    
    return sales;
}

const getSale = async (saleId) => {
    const response = await sendJasminRequest('sales/orders/' + saleId, 'GET');
    return response.data;
}

const getSalesItem = async (salesItemId) => {
    let response = await sendJasminRequest("salesCore/salesItems/" + salesItemId);
    return response.data;
}

const getWaveQuantity = (productId) => {
    let pickingWaves = localStorage.getItem("picking_waves") ? JSON.parse(localStorage.getItem("picking_waves")) : [];

    if (pickingWaves.length === 0) {
        return 0;
    }

    // Gather same product quantities from different waves
    let waveProductsInfo = [];
    for (const wave of pickingWaves) {
        for (const productKey in wave.products) {

            if (waveProductsInfo.hasOwnProperty(productKey)) {
                waveProductsInfo[productKey] += wave.products[productKey].waveQuantity;
            } else {
                waveProductsInfo[productKey] = wave.products[productKey].waveQuantity;
            }
        }
    }

    let waveQuantity = waveProductsInfo[productId] ? waveProductsInfo[productId] : 0;

    return waveQuantity;
}

const getPickedQuantity = async (itemKey) => {
    let materialsItem = await getMaterialsItem(itemKey);
    const shippingWarehouse = materialsItem.materialsItemWarehouses[warehouseIndex.SHIPPING];
    return shippingWarehouse.stockBalance;
}

const getPendingPicking = async () => {
    let pendingPicking = [];

    const allSales = await getAllSales();

    for (const sale of allSales) {
        let pendingPickingProducts = [];

        for (const product of sale.products) {
            
            if (product.saleQuantity > product.pickedQuantity && product.deliveredQuantity === 0) { 
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

            if (product.deliveredQuantity < product.saleQuantity) { //Not complete
                pendingProducts.push(product);

                if (product.pickedQuantity >= product.saleQuantity) { //Ready to package
                    product.packagingStatus = true;
                    hasPickedProducts = true;
                }
            } 
        }

        if (pendingProducts.length > 0 && hasPickedProducts) {
            pendingPackaging.push(sale);
        }
    }

    return pendingPackaging;
}

const getCompleteSales = async () => {
    let completeSales = [];

    const allSales = await getAllSales();

    for (const sale of allSales) {
        let isComplete = true;

        for (const product of sale.products) {
            if (product.deliveredQuantity < product.saleQuantity) { //Not complete
                isComplete = false;
                break;
            } 
        }

        if (isComplete) {
            completeSales.push(sale);
        }
    }

    return completeSales;
}

const confirmPickedProduct = async (product, productQuantity) => {
    const requestBody = {
        loadingStreetName: companyAddress.streetName,
        loadingBuildingNumber: companyAddress.buildingNumber,
        loadingPostalZone: companyAddress.postalZone,
        loadingCityName: companyAddress.cityName,
        loadingCountry: companyAddress.country,
        company: companyName,
        sourceWarehouse: product.warehouse,
        targetWarehouse: WAREHOUSE.SHIPPING,
        documentLines: [
            {
                quantity: productQuantity,
                materialsItem: product.nameId,
            }
        ],
    }

    const response = await sendJasminRequest('materialsManagement/stockTransferOrders', "POST", requestBody);
    return response;
}

const processSale = async (sale) => {
    let orderLines = [];

    for (const product of sale.products) {
        const orderLine = {
            sourceDocKey: sale.info.key,
            sourceDocLineNumber: product.index + 1,
            quantity: product.saleQuantity,
        };

        orderLines.push(orderLine);
    }

    console.log(orderLines)

    const response = await sendJasminRequest('shipping/processOrders/' + companyName, "POST", orderLines);
    return response;
}

export { 
    getAllSales, 
    getSale,
    getPendingPicking, 
    getPendingPackaging,
    getCompleteSales, 
    confirmPickedProduct, 
    processSale 
};