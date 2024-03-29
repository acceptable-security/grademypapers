var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var config = require('./config.js');

var MongoClient = require('mongodb').MongoClient;

var app = express();

var index = require('./routes/index.js');
var login = require('./routes/login.js');
var register = require('./routes/register.js');
var main = require('./routes/main.js');
var submit = require('./routes/submit.js');
var view = require('./routes/view.js');
var logout = require('./routes/logout.js');

app.set('view engine', 'jade');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

MongoClient.connect(config.mongo, function (err, db) {
    if ( err ) throw err;

    app.use(function (req, res, next) {
        req.db = db;
        next();
    });

    config.cookieSecret(function (err, secret) {
        if ( err ) throw err;

        app.use(cookieParser(secret));

        app.use('/', index);
        app.use('/login', login);
        app.use('/register', register);
        app.use('/main', main);
        app.use('/submit', submit);
        app.use('/view', view);
        app.use('/logout', logout);

        app.use('/static', express.static('public'));

        var server = app.listen(3000, function () {
            var host = server.address().address;
            var port = server.address().port;

            console.log('GradeMyPapers listening at http://%s:%s', host, port);
        });
    });
});
