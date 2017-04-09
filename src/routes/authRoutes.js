var express = require('express');
var authRouter = express.Router();

var router = function (nav) {

    authRouter.route('/signUp')
        .post(function (req, res) {
            var user = req.body;

            console.log(user);
            req.login(user, function () {
                res.redirect('/auth/profile');
            });
        });

    authRouter.route('/profile')
        .get(function (req, res) {
            res.json(req.user);
        });

    return authRouter;
};

module.exports = router;