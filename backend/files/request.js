const axios = require('axios');

const ACCOUNT = process.env.REACT_APP_ACCOUNT;
const SUBSCRIPTION = process.env.REACT_APP_SUBSCRIPTION;

const headers = {
	"Accept": "application/json",
	"Content-Type": "application/json; charset=utf-8",
}
module.exports = {
	async sendRequest(url, method, data) {
		const response = await axios(
			{
				baseURL: url,
				method: method,
				data: data,
				headers: headers
			});
		return response;
	},
	
	async sendJasminRequest(resourcePath, method, data) {
		let requestInfo = {
			url: resourcePath,
			baseURL: `https://my.jasminsoftware.com/api/${ACCOUNT}/${SUBSCRIPTION}/`,
			method: method,
			headers: headers
		}
		
		if (data !== undefined && data !== null) {
			requestInfo.data = data;
		}
		
		const response = axios(requestInfo);
		return response;
	}
}
