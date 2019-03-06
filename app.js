const express = require('express')
const fs = require('fs')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.raw({type: '*/*'}))
app.use(express.static('src'))

app.get('/:route',(req, res) => {
    res.send("404")
})

if (module === require.main) {
    app.listen(8080)
}

module.exports = app;