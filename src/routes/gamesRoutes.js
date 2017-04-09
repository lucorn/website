var express = require('express');
var gamesRouter = express.Router();
var sql = require('mssql');

var router = function(nav) {

    gamesRouter.route('/')
        .get(function(req, res) {
            var request = new sql.Request();

            request.query('select * from [Game]', function (err, data) {
                res.render('games', {
                    title: 'Games in chessm8',
                    nav: nav,
                    games: data.recordset
                });
            });
        });

    gamesRouter.route('/:id')
        .all(function (req, res, next) {
            var id = req.params.id;
            var ps = new sql.PreparedStatement();
            ps.input('id', sql.BigInt);
            ps.prepare('select * from [Game] where id = @id', function (err) {
                if (err) {
                    console.log(err);
                    res.status(404).send('Failed to prepare');
                    return;
                }
                ps.execute({id: req.params.id}, function (err, data) {
                    if (err) {
                        console.log(err);
                        res.status(404).send('Failed to execute');
                        return;
                    }
                    if (data.recordset.length === 0) {
                        console.log(err);
                        res.status(404).send('Game not found');
                        return;
                    }
                    req.game = data.recordset[0];
                    next();
                });
            });
        })
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