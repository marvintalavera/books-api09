const express = require('express')
const books = express.Router()
const Book = require('../models/books.js')

// book seed
books.get('/seed', (req, res) => {
 Book.insertMany([
   {
     title: "The Shinobi Initiative",
     description: "The reality-bending adventures of a clandestine service agency in the year 2166",
     year: 2014,
     quantity: 10,
     imageURL: "https://imgur.com/LEqsHy5.jpeg"
   },
   {
     title: "Tess the Wonder Dog",
     description: "The tale of a dog who gets super powers",
     year: 2007,
     quantity: 3,
     imageURL: "https://imgur.com/cEJmGKV.jpg"
   },
   {
     title: "The Annals of Arathrae",
     description: "This anthology tells the intertwined narratives of six fairy tales.",
     year: 2016,
     quantity: 8,
     imageURL: "https://imgur.com/VGyUtrr.jpeg"
   },
   {
     title: "Wâ€RP",
     description: "A time-space anomaly folds matter from different points in earth's history in on itself, sending six unlikely heroes on a race against time as worlds literally collide.",
     year: 2010,
     quantity: 4,
     imageURL: "https://imgur.com/qYLKtPH.jpeg"
   }
 ])
   .then(createdBooks => {
     res.redirect('/books')
   })
})

// Index:
books.get('/', async (req, res) => {
 const foundBooks = await Book.find().limit(2);
 res.json({
   books: foundBooks,
   title: 'Index Page'
 })
})


// CREATE
books.post('/', (req, res) => {
  if(!req.body.imageURL) {
      req.body.imageURL = undefined 
  }
  Book.create(req.body)
  res.redirect('/books')
})

// SHOW
books.get('/:id', async (req, res) => {
 try {
   const foundBook = await Book.findById(req.params.id).lean();
   if (!foundBook) {
     res.status(404).json({ message: 'Book not found' });
   } else {
     res.json(foundBook);
   }
 } catch (err) {
   res.status(500).json({ message: 'An error occurred while retrieving the book' });
 }
});

// UPDATE - PUT
books.put('/:id', async (req, res) => {
 try {
   const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
   res.json(updatedBook);
 } catch (err) {
   res.status(500).json({ message: 'An error occurred while updating the book' });
 }
});

// UPDATE - PATCH
books.patch('/:id', async (req, res) => {
 console.log('Request body:', req.body); // Log the request body
 try {
   const updatedBook = await Book.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
   res.redirect(`/books/${req.params.id}`);
 } catch (err) {
   console.error('Error:', err.message); // Log the error message
   res.status(500).json({ message: 'An error occurred while updating the book', error: err.message });
 }
});

// DELETE
books.delete('/:id', (req, res) => {
 Book.findByIdAndDelete(req.params.id) 
   .then(deletedBook => { 
     console.log('Deleted data:', deletedBook);
     res.status(303).redirect('/books');
   })
});

module.exports = books