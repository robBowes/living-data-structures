const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.raw({type: '*/*'}))

app.get('/',(req, res) => {
    res.send('hello world')
})

app.listen(8080)