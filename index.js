const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.post('/', function (req, res) {
  let data = req.body;
  console.log(data);
})

app.get('/', function (req, res) {
  console.log('A GET METHOD');
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})