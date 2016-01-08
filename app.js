var express = require('express');
var app = express();

var index = require('./routes/index.js');
var login = require('./routes/login.js');
var register = require('./routes/register.js');
var main = require('./routes/main.js');
var submit = require('./routes/submit.js');
var view = require('./routes/view.js');

app.set('view engine', 'jade');

app.use('/', index);
app.use('/login', login);
app.use('/register', register);
app.use('/main', main);
app.use('/submit', submit);
app.use('/view', view);

app.use('/static', express.static('public'));

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('GradeMyPapers listening at http://%s:%s', host, port);
});
