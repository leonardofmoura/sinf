const axios = require('axios');
const FormData = require('form-data');
require('dotenv').config()

const ACCOUNT = process.env.REACT_APP_ACCOUNT;
const SUBSCRIPTION = process.env.REACT_APP_SUBSCRIPTION;

const headers = {
	"Accept": "application/json",
	"Content-Type": "application/json; charset=utf-8",
}
module.exports = {
	async sendRequest(url, method, data) {
		console.log(data);
		let formData = new FormData()
		for (const key in data)
			if (data.hasOwnProperty(key)) {
				formData.append(key, data[key])
			}
		const requestInfo = {
			baseURL: url,
			method: method,
			headers: {...formData.getHeaders()},
			data: formData
		}
		const response = await axios(requestInfo)
		return response.data
	},
	
	async sendJasminRequest(resourcePath, method, data) {
		let requestInfo = {
			url: resourcePath,
			baseURL: `https://my.jasminsoftware.com/api/${ACCOUNT}/${SUBSCRIPTION}/`,
			method: method,
			headers: headers
		}
		if (method === "POST")
			requestInfo.data = data
		//	console.log(requestInfo)
		try {
			const response = await axios(requestInfo)
			console.log("Response is ok")
			return response.data
		} catch (error) {
			if (error.response.status === 401) {
				console.log("Not logged in")
			}
			else {
				console.log("Other error in jasmin request")
				console.log(error)
			}
		}
	}
}