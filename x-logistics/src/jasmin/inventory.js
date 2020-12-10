const { sendJasminRequest } = require("./request")

const getMaterialsItem = async (itemId) => {
    const response = await sendJasminRequest("/materialsCore/materialsItems/" + itemId);
    return response.data;
}

export { getMaterialsItem };