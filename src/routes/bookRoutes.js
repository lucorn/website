var express = require('express');

var bookRouter = express.Router();

var router = function(nav) {
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
                nav: nav,
                books: books
            });
        });

    bookRouter.route('/:id')
        .get(function(req, res) {
            var id = req.params.id;
            res.render('bookView', {
                title: 'A book',
                nav: nav,
                book: books[id]
            });
        });

    return bookRouter;
};

module.exports = router;