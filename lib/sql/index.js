const express = require('express');
const app = express();

app.post('/songs', async (req, res) => {
    const song = await Song.insert(req.body);
    res.send(song);
    // Song
    //   .insert(req.body)
    //   .then(song => res.send(song));
});

app.get('/songs', (req, res) => {
    Song
        .find()
        .then(songs => res.send(songs));
});

module.exports = app;
