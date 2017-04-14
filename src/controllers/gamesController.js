
var sql = require('mssql');

var gamesController = function (nav) {

    var getAllGames = function(req, res) {
        var request = new sql.Request();

        request.query('select * from [Game]', function (err, data) {
            res.render('games', {
                title: 'Games in chessm8',
                nav: nav,
                games: data.recordset
            });
        });
    };

    var getGameById = function (req, res, next) {
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
    };

    return {
        getAllGames: getAllGames,
        getGameById: getGameById
    };
};

module.exports = gamesController;