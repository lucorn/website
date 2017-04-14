var express = require('express');
var gamesRouter = express.Router();
var sql = require('mssql');

var router = function(nav) {

    var gamesController = require('../controllers/gamesController')(nav);

    gamesRouter.route('/')
        .get(gamesController.getAllGames);

    gamesRouter.route('/:id')
        .all(gamesController.getGameById)
        .get(function(req, res) {
            res.render('gameView', {
                title: 'A game',
                nav: nav,
                game: req.game
            });
        });

    return gamesRouter;
};

module.exports = router;