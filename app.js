const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.raw({type: '*/*'}))

app.get('/',(req, res) => {
    res.send('hello world')
})
if (module === require.main) {
    // [START server]
    // Start the server
    const server = app.listen(process.env.PORT || 8080, () => {
      const port = server.address().port;
      console.log(`App listening on port ${port}`);
    });
    // [END server]
  }
module.exports = app;