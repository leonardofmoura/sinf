import { companyAddress, companyKey, companyName } from "./companyInfo";
import { getMaterialsItem } from "./inventory";
import { sendJasminRequest } from "./request";
import { WAREHOUSE } from "./warehouse";
import { warehouseIndex } from "./warehouse";

const moment = require('moment');

const getAllSales = async () => {
    const resource = "sales/orders";
    const response = await sendJasminRequest(resource, "get");
    return response.data;
}

const parseSales = async (originalSales, wantPickedQuantity, wantOnlyComplete, wantOnlyPending) => {
    let sales = [];

    let salesItems = [];
    let pickedQuantities = [];

    for (const sale of originalSales) {
        let isComplete = true;
        let isPending = true;

        if (sale.isDeleted) {
            continue;
        }
        
        let products = [];
        for (const product of sale.documentLines) {

            if (product.itemTypeDescription  === "Service") {
                continue;
            }

            if (wantOnlyComplete && product.deliveredQuantity < product.quantity) {
                isComplete = false;
                continue;
            }

            if (wantOnlyPending && product.deliveredQuantity >= product.quantity) {
                isPending = false;
                continue;
            }

            let salesItem;
            if (!salesItems.hasOwnProperty(product.salesItemId)) {
                salesItem = await getSalesItem(product.salesItemId);
                salesItems[product.salesItemId] = salesItem;
            } else {
                salesItem = salesItems[product.salesItemId];
            }

            let pickedQuantity = 0;
            if (wantPickedQuantity) {
                if (!pickedQuantities.hasOwnProperty(salesItem.itemKey)) {
                    pickedQuantity = await getPickedQuantity(salesItem.itemKey);
                    pickedQuantities[salesItem.itemKey] = pickedQuantity;
                } else {
                    pickedQuantity = pickedQuantities[salesItem.itemKey];
                }
            }
            
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
                pickedQuantity: pickedQuantity,
                unit: product.unit,

                warehouse: product.warehouse,

                isInPickingWave: false,
                packagingStatus: false,
            };
            
            products.push(parsedProduct);
        }

        if (wantOnlyComplete && !isComplete) {
            continue;
        }

        if (wantOnlyPending && !isPending) {
            continue;
        }
        
        let saleInfo = {
            id: sale.naturalKey,
            jasminId: sale.id,
            customer: sale.buyerCustomerPartyDescription,
            customerId: sale.buyerCustomerParty,
            isDeleted: sale.isDeleted,
            deliveryTerm: sale.deliveryTerm,
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
    const sales = await parseSales(allSales, true, false, true);

    for (const sale of sales) {
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
    const sales = await parseSales(allSales, true, false, true);

    for (const sale of sales) {
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
    const allSales = await getAllSales();
    const completeSales = await parseSales(allSales, false, true, false);

    return completeSales;
}

const confirmPickedProduct = async (product, productQuantity) => {
    const requestBody = {
        loadingStreetName: companyAddress.streetName,
        loadingBuildingNumber: companyAddress.buildingNumber,
        loadingPostalZone: companyAddress.postalZone,
        loadingCityName: companyAddress.cityName,
        loadingCountry: companyAddress.country,
        company: companyKey,
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

const createSale = async (sale) => {
    const request = {
        company: companyKey,
        buyerCustomerParty: sale.info.customerId,
        deliveryTerm: sale.info.deliveryTerm,
        documentLines: [],
    }

    for (const product of sale.products) {
        request.documentLines.push({
            salesItem: product.nameId,
            quantity: product.saleQuantity,
            warehouse: WAREHOUSE.SHIPPING,
        });
    }

    const response = await sendJasminRequest(`/sales/orders/`, "POST", request);
    return response;
}

const deleteSale = async (sale) => {
    const response = await sendJasminRequest(`/sales/orders/${sale.info.jasminId}`, "DELETE");
    return response;
}

const processSale = async (sale) => {
    console.log(sale.jasminId);
    const resp = await createSale(sale);
    const rep = await deleteSale(sale);
    console.log(rep)
    const newSale = await getSale(resp.data);
    let orderLines = [];

    for (const product of newSale.documentLines) {
        const orderLine = {
            sourceDocKey: newSale.naturalKey,
            sourceDocLineNumber: product.index + 1,
            quantity: product.quantity,
            warehouse: WAREHOUSE.SHIPPING,
        };

        orderLines.push(orderLine);
    }

    console.log(orderLines);

    const response = await sendJasminRequest('shipping/processOrders/' + companyKey, "POST", orderLines);
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