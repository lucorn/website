var express = require('express');

var router = express.Router();

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

router.route('/')
    .get(function(req, res) {
        res.render('books', {
            title: 'Hello  for books',
            nav: [{Link: '/Books', Text: 'Books'}, {Link: '/Authors', Text: 'Authors'}],
            books: books
        });
    });

router.route('/:id')
    .get(function(req, res) {
        var id = req.params.id;
        res.render('bookView', {
            title: 'A book',
            nav: [{Link: '/Books', Text: 'Books'}, {Link: '/Authors', Text: 'Authors'}],
            book: books[id]
        });
    });

module.exports = router;