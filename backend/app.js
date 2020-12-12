const token = require("./files/token")
const request = require("./files/request")
const express = require('express')
const app = express()
const port = 3001
const cookieParser = require('cookie-parser')
const cors = require("cors")

app.use(cors())
app.use(cookieParser())

app.get('/', (req, res) => {
	console.log("Test backend is working")
	res.send("Backend is working")
})
app.get('/api/getToken', (req, res) => {
	console.log("Order to get token")
	token.setAutoToken().then(() =>{
		console.log("Got token successfully")
		res.send("got the token")})
})

app.post('/api/sendRequest', (req, res) => {
	console.log(req.body)
	request.sendRequest(req.body.url, req.body.method, req.body.data).then(function (response) {
			console.log(response)
			res.send(response)
		}
	)
})

app.post('/api/sendJasmineRequest', (req, res) => {
	console.log(req.body)
	request.sendJasminRequest(req.body.resourcePath, req.body.method, req.body.data).then(function (response) {
			console.log(response)
			res.send(response)
		}
	)
})

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`)
})

