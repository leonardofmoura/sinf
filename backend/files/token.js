const request = require("./request")

const axios = require("axios");

let isTokenSet = false;

module.exports = {
	async getToken() {
		const CLIENT_ID = process.env.REACT_APP_CLIENT_ID
		const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;
		
		const url = "https://identity.primaverabss.com/connect/token";
		
		const body = {
			client_id: CLIENT_ID,
			client_secret: CLIENT_SECRET,
			grant_type: "client_credentials",
			scope: "application"
		};
		
		await request.sendRequest(url, 'post', body).then(response => {
			return response.data.access_token
		})
	},
	
	async setToken(token) {
		axios.defaults.headers.common = {"Authorization": `bearer ${token}`};
	},
	
	async updateToken() {
		this.getToken().then((token) => {
			this.setToken(token);
		})
	},

// Intercept request in case of unauthorized error and request new token
	async setAutoToken() {
		if (!isTokenSet) {
			await this.updateToken();
			isTokenSet = true;
		}
		
		axios.interceptors.response.use((response) => (response),
			(error) => {
				// Return any error which is not due to authentication back to the calling service
				if (error.response.status !== 401 && error.response.status !== 400) {
					return new Promise((_resolve, reject) => {
						reject(error);
					});
				}
				
				// Try request again with new token
				return this.getToken()
					.then((token) => {
						
						if (token) {
							this.setToken(token);
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
}
