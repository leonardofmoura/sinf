const axios = require('axios');
const FormData = require('form-data');

const getBodyData = (formObj) => {
    let bodyData = new FormData();
    for (const key in formObj) {
        bodyData.append(key, formObj[key]);
    }
    return bodyData;
};

async function getToken() {

    const url = "https://identity.primaverabss.com/connect/token";
    const proxy = "https://cors-anywhere.herokuapp.com/"

    const headers = {
        "Accept": "application/json",
        "Content-Type": "multipart/form-data",
    }

    const body = {
        client_id: "GXSAKEY",
        client_secret: "70fce762-8fc6-4095-ab02-708f1ab99e13",
        grant_type: "client_credentials",
        scope: "application"
    };

    const bodyData = getBodyData(body);

   axios({
        baseURL: proxy + url,
        method: 'post',
        data: bodyData,
        headers: headers
    }).then((response) => { console.log(response.data.access_token)})


}