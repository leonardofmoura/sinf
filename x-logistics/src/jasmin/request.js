const axios = require('axios');
const FormData = require('form-data');

const ACCOUNT = process.env.REACT_APP_ACCOUNT;
const SUBSCRIPTION = process.env.REACT_APP_SUBSCRIPTION;

const headers = {
	"Accept": "application/json",
	"Content-Type": "application/json; charset=utf-8",
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

const sendJasminRequest = async (resourcePath, method, data) => {
    let requestInfo = {
        url: resourcePath,
        baseURL: `https://my.jasminsoftware.com/api/${ACCOUNT}/${SUBSCRIPTION}/`,
        method: method,
        headers: headers
    }

    if (data !== undefined && data !== null) {
		requestInfo.data = data//getBodyData(data);
    }

    const response = axios(requestInfo);
    return response;
}

export { sendRequest, sendJasminRequest }