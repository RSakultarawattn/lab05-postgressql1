const express = require('express');
const Guitar = require('../models/Guitars');
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


module.exports = app;
