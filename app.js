var express = require('express');
var app = express();

var sql = require('mssql');
var config = {
    user: 'cornellupu',
    password: 'Piramidal0',
    server: 'zpeoik8c7r.database.windows.net',
    database: 'chessm8_db',
    options: {
        encrypt: true
    }
};

sql.connect(config, function (err) {
    if (err !== null) {
        console.log(err);
    }
});

var port = process.env.PORT || 3000;

var nav = [{Link: '/Books', Text: 'Book'}, {Link: '/Authors', Text: 'Author'}];

var bookRouter = require('./src/routes/bookRoutes')(nav);

app.use(express.static('public'));
app.set('views', 'src/views');

app.set('view engine', 'ejs');

app.use('/Books', bookRouter);

app.get('/', function(req, res) {
    res.render('index', {
        title: 'Hello from app.js...',
        nav: nav
    });
});

app.listen(port, function (error) {
    console.log('running on port', port);
});