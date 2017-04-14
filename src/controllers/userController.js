
var sql = require('mssql');

var userController = function (nav) {

    var getAllUsers = function(req, res) {
        var request = new sql.Request();

        request.query('select * from [User]', function (err, data) {
            res.render('users', {
                title: 'Users in chessm8',
                nav: nav,
                users: data.recordset
            });
        });
    };

    var getUserById = function (req, res, next) {
        var id = req.params.id;
        var ps = new sql.PreparedStatement();
        ps.input('id', sql.BigInt);
        ps.prepare('select * from [User] where id = @id', function (err) {
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
                    res.status(404).send('User not found');
                    return;
                }
                req.user = data.recordset[0];
                next();
            });
        });
    };

    return {
        getAllUsers: getAllUsers,
        getUserById: getUserById
    };
};

module.exports = userController;