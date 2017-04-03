var express = require('express');

var app = express();

var port = process.env.PORT || 3000;

app.use(express.static('public'));
app.set('views', 'src/views');

app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    res.render('index', {title: 'Hello from app.js...',
            nav: [{Link: '/Books', Text: 'Books'}, {Link: '/Authors', Text: 'Authors'}]});
});

app.get('/books', function(req, res) {
    res.send('hi there! You are now in books!');
});

app.listen(port, function (error) {
    console.log('running on port', port);
});