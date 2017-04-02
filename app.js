var express = require('express');

var app = express();

var port = 3000;

app.use(express.static('public'));

app.use(express.static('src/views'));

app.get('/', function(req, res) {
    res.send('hi there!');
});

app.get('/books', function(req, res) {
    res.send('hi there! You are now in books!');
});

app.listen(port, function (error) {
    console.log('running on port', port);
});