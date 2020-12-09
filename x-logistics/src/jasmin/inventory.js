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
            warehouse: item["warehouseKey"],
            description: item["description"],
            totalItems: allItems.reduce(
                (acc,article) => (acc.push(article.warehouses.filter((w) => w.name === item.warehouseKey)), acc), []
            ).reduce((total,wa) => wa.length > 0 ? total + wa[0].stock : 0 ,0),
        };
    });

    return warehouses;
}

export {getInventory, getWarehouses};