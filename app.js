var express = require('express');

var app = express();

var port = process.env.PORT || 3000;
var bookRouter = express.Router();

app.use(express.static('public'));
app.set('views', 'src/views');

app.set('view engine', 'ejs');

var books = [
    {
        title: 'War and Peace',
        genre: 'Historical Fiction',
        author: 'Lev Nikolayevich Tolstoy',
        read: false
    },
    {
        title: 'The end of Eternity',
        genre: 'Science Fiction',
        author: 'Isaac Asimov',
        read: true
    }
];

bookRouter.route('/')
    .get(function(req, res) {
        res.render('books', {
            title: 'Hello  for books',
            nav: [{Link: '/Books', Text: 'Books'}, {Link: '/Authors', Text: 'Authors'}],
            books: books
        });
    });

bookRouter.route('/single')
    .get(function(req, res) {
        res.send('Hello Single Book');
    });

app.use('/Books', bookRouter);

app.get('/', function(req, res) {
    res.render('index', {
        title: 'Hello from app.js...',
        nav: [{Link: '/Books', Text: 'Books'}, {Link: '/Authors', Text: 'Authors'}]
    });
});

app.listen(port, function (error) {
    console.log('running on port', port);
});