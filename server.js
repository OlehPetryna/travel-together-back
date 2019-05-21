const express = require('express');
const app = express();

const cors = require('cors');

const db = require('./db');
const toursDb = new db();

toursDb.connect();

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cors());

app.post('/fetch-tours', function (req, res) {
    const body = req.body;

    const tours = toursDb.find(body);

    res.json(tours)
});

app.post('/add-tours', function (req, res) {
    const body = req.body;
    const tours = body.tours;

    const count = toursDb.insert(tours).insertedCount;

    res.json({inserted: count});
});

app.listen(8080, function () {
    console.log('server started');
});