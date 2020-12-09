require('dotenv').config();
const express = require('express');
const app = express();
app.use(express.json());
const Map = require('./lib/models/maps');

app.get('/', (req, res) => {
  console.log(req.body);
  res.send('It is mapping time!!');
});

// Create a map
app.post('/map', (req, res) => {
  try {
    Map
      .insert(req.body)
      .then(map => res.send(map));
  } catch(e) {
    res.status(500).json({ error: e.message });
  }
});

// Get all maps
app.get('/map', (req, res) => {
  Map
    .find()
    .then(map => res.send(map));
});

// Get one map by ID
app.get('/map/:id', (req, res) => {
  Map
    .findById(req.params.id)
    .then(map => res.send(map));
});

// Update a map by ID
app.put('/map/:id', (req, res) => {
  Map
    .update(req.params.id, req.body)
    .then(map => res.send(map));
});

// Delete one map by ID
app.delete('/map/:id', (req, res) => {
  Map
    .delete(req.params.id)
    .then(map => res.send(map));
});

module.exports = app;
