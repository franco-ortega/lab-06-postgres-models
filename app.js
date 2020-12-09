require('dotenv').config();
const express = require('express')
const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  console.log(req.body);
  res.send('It is mapping time!!');
});

module.exports = app;
