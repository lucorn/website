var express = require('express');
var sql = require('mssql');

var usersRouter = express.Router();

var router = function(nav) {

    var userController = require('../controllers/userController')(nav);

    usersRouter.route('/')
        .get(userController.getAllUsers);

    usersRouter.route('/:id')
        .all(userController.getUserById)
        .get(function(req, res) {
            res.render('userView', {
                title: 'A user',
                nav: nav,
                user: req.user
            });
        });

    return usersRouter;
};

module.exports = router;