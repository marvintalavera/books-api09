// DEPENDENCIES
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// CONFIGURATION
require('dotenv').config();
const PORT = process.env.PORT;
const app = express();

// configure body-parser to handle JSON data
app.use(express.json());

// Enable CORS for all requests
app.use(cors());

const booksController = require('./controllers/books_controller');
app.use('/books', booksController);

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// mongoose
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('connected to mongo: ', process.env.MONGO_URI);
  });

app.listen(PORT, () => console.log(`Server is running in port ${PORT}`));

module.exports = app;