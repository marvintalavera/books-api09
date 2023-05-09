const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    default: "The Shinobi Initiative"
  },
  description: {
    type: String,
    default: "The reality-bending adventures of a clandestine service agency in the year 2166"
  },
  year: {
    type: Number,
    default: 2014
  },
  quantity: {
    type: Number,
    default: 10
  },
  imageURL: {
    type: String,
    default: "/assets/shinobi-initiative.jpeg"
  }
});

module.exports = mongoose.model('Book', bookSchema);