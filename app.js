const express = require('express');
const mongoose = require('mongoose');
const cacheRoutes = require('./src/routes/cacheRoutes');

const app = express();
app.use(express.json());

const dbURI = 'mongodb+srv://bayeed:bayeed123@cluster0.7myjj.mongodb.net/cache-db?retryWrites=true&w=majority';

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => app.listen(5000))
  .catch(err => console.log(err));

//routes
app.use('/', cacheRoutes);

app.use((req, res) => {
  res.status(404).send('not found!')
});
