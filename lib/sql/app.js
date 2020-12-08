const express = require('express');
const Guitar = require('../models/Guitars');
const Song = require('../models/Song');
const Dragon = require('../models/Dragon');
const Band = require('../models/Band');
const Book = require('../models/Book');




const app = express();

app.use(express.json());




app.post('/api/v1/songs', (req, res, next) => {
  Song
    .insert(req.body)
    .then(song => res.send(song))
    .catch(next);
});


app.get('/api/v1/songs', (res) => {
  Song
    .find()
    .then(song => res.send(song));
});

app.get('/api/v1/songs/:id', (req, res, next) => {
  Song
    .findById(req.params.id)
    .then(song => res.send(song))
    .catch(next);

});


app.put('/api/v1/songs/:id', (req, res, next) => {
  Song  
    .update(req.params.id, req.body)
    .then(song => res.send(song))
    .catch(next);
});


app.delete('/api/v1/songs', (req, res) => {
  Song
    .delete(req.body.id)
    .send(song => res.send(song));
});

app.post('/guitars', async(req, res) => {
  const guitar = await Guitar.insert(req.body);
  res.send(guitar);

});

app.get('/guitars', (req, res) => {
  Guitar
    .find()
    .then(guitars => res.send(guitars));
});
app.delete('/guitars', (req, res) => {
  Song
    .delete(req.body.id)
    .send(song => res.send(song));
});

app.post('/dragons', async(req, res) => {
  const dragon = await Dragon.insert(req.body);
  res.send(dragon);

});

app.get('/dragons', (req, res) => {
  Dragon
    .find()
    .then(dragons => res.send(dragons));
});
app.delete('/dragons', (req, res) => {
  Dragon
    .delete(req.body.id)
    .send(dragon => res.send(dragon));
});


app.post('/bands', async(req, res) => {
  const band = await Band.insert(req.body);
  res.send(band);

});

app.get('/bands', (req, res) => {
  Band
    .find()
    .then(bands => res.send(bands));
});

app.delete('/bands', (req, res) => {
  Song
    .delete(req.body.id)
    .send(band => res.send(band));
});

app.post('/books', async(req, res) => {
  const book = await Book.insert(req.body);
  res.send(book);

});

app.get('/books', (req, res) => {
  Band
    .find()
    .then(books => res.send(books));
});

app.delete('/books', (req, res) => {
  Song
    .delete(req.body.id)
    .send(book => res.send(book));
});



module.exports = app;
