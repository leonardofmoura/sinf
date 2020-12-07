const axios = require('axios');
const FormData = require('form-data');

const ACCOUNT = process.env.REACT_APP_ACCOUNT;
const SUBSCRIPTION = process.env.REACT_APP_SUBSCRIPTION;

const headers = {
    "Accept": "application/json",
    "Content-Type": "multipart/form-data",
}

const getBodyData = (formObj) => {
    let bodyData = new FormData();
    for (const key in formObj) {
        bodyData.append(key, formObj[key]);
    }
    return bodyData;
};

const sendRequest = async (url, method, data) => {
    const response = await axios(
    {
        baseURL: url,
        method: method,
        data: getBodyData(data),
        headers: headers
    });
    return response;
}

const sendJasminRequest = async (resourcePath, method) => {
    const response = axios(
    {
        url: resourcePath,
        baseURL: `https://my.jasminsoftware.com/api/${ACCOUNT}/${SUBSCRIPTION}/`,
        method: method,
        headers: headers
    })
    return response;
}

export { sendRequest, sendJasminRequest }