const axios = require("axios");

// Intercept request in case of unauthorized error and request new token
const setAutoToken = async () => {
	await axios.get("http://localhost:3001/api/getToken").then(response => {
		console.log(response.data)
	})
}

export {setAutoToken};