const token = require("./files/token")
const request = require("./files/request")
const express = require('express')
const app = express()
const port = 3001
const cors = require("cors")
const bodyParser = require("body-parser");

app.use(cors())
app.use(bodyParser.json())

app.get('/', (req, res) => {
	res.statusCode = 200
	console.log("Test backend is working")
	res.send("Backend is working")
})

app.get('/api/getToken', (req, res) => {
	console.log("Order to get token")
	token.updateToken().then(() => {
		console.log("Got token successfully")
		res.statusCode = 200
		res.send("got the token")})
})

app.post('/api/sendJasminRequest', (req, res) => {
	console.log("sendJasminRequest "+req.body.resourcePathData)
	request.sendJasminRequest(req.body.resourcePathData, req.body.methodData, req.body.dataData).then(function (response) {
			res.send(response)
		}
	)
})

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`)
})

