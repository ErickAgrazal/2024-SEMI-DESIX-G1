require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const port = 3000;

const createOrder = require('./createOrder');

app.use(cors());

app.post('/payment/create', async (req, res) => {
  const order = await createOrder(req, res);
  res.json(order);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
