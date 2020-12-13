const axios = require('axios');

const headers = {
	"Accept": "application/json",
	"Content-Type": "application/json",
}

const sendJasminRequest = async (resourcePath, method, data) => {
	const body = {
		resourcePathData: resourcePath,
		methodData: method,
		dataData: data
	}
	const requestInfo = {
		url: "http://localhost:3001/api/sendJasminRequest",
		method: "POST",
		data: JSON.stringify(body),
		headers: headers
	}
	console.log(resourcePath)
	const response = await axios(requestInfo)
	console.log(resourcePath+" 2")
	return response
}

export {sendJasminRequest}