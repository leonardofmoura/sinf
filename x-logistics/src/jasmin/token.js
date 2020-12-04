import { sendRequest } from "./request";
const axios = require("axios");

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;

async function getToken() {

    const url = "https://identity.primaverabss.com/connect/token";
    const proxy = "https://cors-anywhere.herokuapp.com/"

    const body = {
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        grant_type: "client_credentials",
        scope: "application"
    };

    const response = await sendRequest(proxy + url, 'post', body);

    return response.data.access_token;
}

const setToken = (token) => {
    axios.defaults.headers.common = { "Authorization": `bearer ${token}` };
};

// Intercept request in case of unauthorized error and request new token
const setAutoToken = () => {
    axios.interceptors.response.use((response) => (response),
        (error) => {
            // Return any error which is not due to authentication back to the calling service
            if (error.response.status !== 401) {
                return new Promise((_resolve, reject) => {
                    reject(error);
                });
            }
            
            // Try request again with new token
            return getToken()
                .then((token) => {
                
                if (token) {
                    setToken(token);
                }
                
                const config = error.config;
                
                return new Promise((resolve, reject) => {
                    axios.request(config).then((response) => {
                        resolve(response);
                    }).catch((error) => {
                        reject(error);
                    });
                });
                
            })
            .catch((error) => {
                Promise.reject(error);
            });
        },
    ); 
}

export { getToken, setToken, setAutoToken };