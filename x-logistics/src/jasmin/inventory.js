const { sendJasminRequest } = require("./request")


const getInventory = async () => {
    let response = await sendJasminRequest("materialscore/materialsitems","GET");

    const items = response.data.map((item) =>{
        return {
            id: item["itemKey"],
            name: item["description"],
            category: item["assortment"],
            warehouses: item["materialsItemWarehouses"].map((warehouse) => {
                return {
                    stock: warehouse["stockBalance"],
                    name: warehouse["warehouse"],
                    description: warehouse["warehouseDescription"],
                }
            }),
        };
    });

    return items;
}

const getWarehouses = async () => {
    let response = await sendJasminRequest("materialscore/warehouses","GET");
    let allItems = await getInventory();

    const warehouses = response.data.map((item) =>{
        return {
            id: item["id"],
            warehouse: item["warehouseKey"],
            description: item["description"],
            totalItems: allItems.reduce(
                (acc,article) => (acc.push(article.warehouses.filter((w) => w.name === item.warehouseKey)), acc), []
            ).reduce((total,wa) => wa.length > 0 ? total + wa[0].stock : 0 ,0),
        };
    });

    return warehouses;
}

const getWarehouseItems = async (warehouseId) => {
    //TODO: Add warehouse not found

    let response = await sendJasminRequest("materialscore/warehouses","GET");
    let allItems = await getInventory();

    const warehouseItems = allItems.filter((elem) => elem.warehouses.find((w) => w.name === warehouseId).stock > 0);

    const info = {
        name: warehouseId,
        description: response.data.find((elem) => elem.warehouseKey === warehouseId).description,
        stock: allItems.reduce(
            (acc,article) => (acc.push(article.warehouses.filter((w) => w.name === warehouseId)), acc), []
        ).reduce((total,wa) => wa.length > 0 ? total + wa[0].stock : 0 ,0),
        items: warehouseItems.map((item) => {
            return {
                id: item.id,
                name: item.name,
                category: item.category,
                stock: item.warehouses.find((w) => w.name === warehouseId).stock
            }
        } ),
    }

    return info;
}

const getMaterialsItem = async (itemId) => {
    const response = await sendJasminRequest("/materialsCore/materialsItems/" + itemId);
    return response.data;
}

export {getInventory, getWarehouses, getWarehouseItems, getMaterialsItem};
