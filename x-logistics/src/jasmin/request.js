const axios = require('axios');

const headers = {
	"Accept": "application/json",
	"Content-Type": "application/json; charset=utf-8",
}

const sendRequest = async (url, method, data) => {
	let body = {
		url: url,
		method: method,
		data: data
	}
	await axios(
		{
			url: "http://localhost:3001/api/sendRequest",
			method: "POST",
			data: body,
			headers: headers
		}).then(response => {
		return response
	})
}

const sendJasminRequest = async (resourcePath, method, data) => {
	let body = {
		resourcePath: resourcePath,
		method: method,
		data: data
	}
	let requestInfo = {
		url: "http://localhost:3001/api/sendJasmineRequest",
		method: method,
		data: body,
		headers: headers
	}
	
	await axios(requestInfo).then(response => {
			return response
		}
	)
}

export {sendRequest, sendJasminRequest}