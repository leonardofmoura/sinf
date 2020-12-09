const { sendJasminRequest } = require("./request")


const getInventory = async () => {
    let response = await sendJasminRequest("materialscore/materialsitems","GET");
    console.log(response.data);

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

export {getInventory};