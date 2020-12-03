const axios = require('axios').default;

const url = "https://identity.primaverabss.com/connect/token";

export default async function getToken() {
    const response = await axios.post(url, {
        grant_type: "client_credentials",
        client_id: "GXSAKEY",
        client_secret: "70fce762-8fc6-4095-ab02-708f1ab99e13",
        scope: "application"
    });
    return response;
}