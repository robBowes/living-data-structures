const express = require('express')
const fs = require('fs')
const bodyParser = require('body-parser')
const zlib = require('zlib')

const app = express()

app.use(bodyParser.raw({type: '*/*'}))

app.get('/',(req, res) => {
    const src = fs.createReadStream('./src/index.html', 'utf8')
    res.writeHead(200, { 'Content-Encoding': 'gzip' });
    src.pipe(zlib.createGzip()).pipe(res)
})

app.get(/[\S]+css$/,(req, res) => {
    const src = fs.createReadStream('./src/' + req.url, 'utf8')
    res.writeHead(200, { 'Content-Encoding': 'gzip' })
    src.pipe(zlib.createGzip()).pipe(res)
})

app.get(/[\S]+js$/,(req, res) => {
    const src = fs.createReadStream('./src/' + req.url, 'utf8')
    res.writeHead(200, { 'Content-Encoding': 'gzip', 'Content-Type': 'text/javascript' })
    src.pipe(zlib.createGzip()).pipe(res)
})

app.get('/:route',(req, res) => {
    res.send("404")
})


if (module === require.main) {
    app.listen(8080)
}

module.exports = app