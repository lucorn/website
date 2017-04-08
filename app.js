var express = require('express');

var app = express();

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