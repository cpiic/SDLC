const express = require('express');
const app = module.exports = express();
const port = 8080;

// app data
const products = require("./data/ikea_products.json");
const api_data = require("./data/api.json");

// validating the API key
app.use('/api', (req, res, next) => {
  var key = req.query['api-key'];

  // check if key is valid
  if (api_data.key != key) return next(Error('invalid api key'));

  // store key and go next 
  req.key = key;
  next();
});

// listing products
app.get('/api/products', (req, res) => {
  res.send(products);
})

// welcome
app.get('/', (req, res) => {
  res.send('welcome to IKEA Labs!')
})

// 500 error handling
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({ error: err.message });
})

// 404 error handling
app.use((req, res) => {
  res.status(404);
  res.send({ error: "not found!" });
})

// app listen start
app.listen(port, () => {
  console.log(`ikea lab app listening on port ${port}`)
})
