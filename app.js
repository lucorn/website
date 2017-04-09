var express = require('express');
var bodyParser = require('body-parser');

var app = express();

var sql = require('mssql');

var sqlsecrets = require('./src/config/sqlsecrets');

var config = {
    user: sqlsecrets.user,
    password: sqlsecrets.password,
    server: 'zpeoik8c7r.database.windows.net',
    database: 'chessm8_db',
    options: {
        encrypt: true
    }
};

sql.connect(config, function (err) {
    if (err !== null) {
        console.log(err);
    }
});

var port = process.env.PORT || 3000;

var nav = [{Link: '/Users', Text: 'Users'}, {Link: '/Games', Text: 'Games'}];

var usersRouter = require('./src/routes/usersRoutes')(nav);
var gamesRouter = require('./src/routes/gamesRoutes')(nav);
var searchRouter = require('./src/routes/searchRoutes')(nav);

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.set('views', 'src/views');
app.set('view engine', 'ejs');

app.use('/Users', usersRouter);
app.use('/Games', gamesRouter);
app.use('/Search', searchRouter);

app.get('/', function(req, res) {
    res.render('index', {
        title: 'Hello from app.js...',
        nav: nav
    });
});

app.listen(port, function (error) {
    console.log('running on port', port);
});