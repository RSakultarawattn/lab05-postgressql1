const express = require('express');
const Guitar = require('../models/Guitars');
const Song = require('../models/Song');
const Dragon = require('../models/Dragon');
const Band = require('../models/Band');
const Book = require('../models/Book');




const app = express();

app.post('/songs', async (req, res) => {
    const song = await Song.insert(req.body);
    res.send(song);

});

app.get('/songs', (req, res) => {
    Song
        .find()
        .then(songs => res.send(songs));
});

app.post('/guitars', async (req, res) => {
    const guitar = await Guitar.insert(req.body);
    res.send(guitar);

});

app.get('/guitars', (req, res) => {
    Guitar
        .find()
        .then(guitars => res.send(guitars));
});

app.post('/dragons', async (req, res) => {
    const dragon = await Dragon.insert(req.body);
    res.send(dragon);

});

app.get('/dragons', (req, res) => {
    Dragon
        .find()
        .then(dragons => res.send(dragons));
});

app.post('/bands', async (req, res) => {
    const band = await Band.insert(req.body);
    res.send(band);

});

app.get('/bands', (req, res) => {
    Band
        .find()
        .then(bands => res.send(bands));
});

app.post('/books', async (req, res) => {
    const book = await Book.insert(req.body);
    res.send(book);

});

app.get('/books', (req, res) => {
    Band
        .find()
        .then(books => res.send(books));
});



module.exports = app;
