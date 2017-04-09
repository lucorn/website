var express = require('express');
var searchRouter = express.Router();

var router = function (nav) {

    searchRouter.route('/filter')
        .post(function (req, res) {
            console.log(req.body);
        });

    return searchRouter;
};

module.exports = router;