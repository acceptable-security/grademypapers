var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    if ( req.signedCookies !== undefined && req.signedCookies.cookie !== undefined ) {
        req.db.collection('users').findOne({ cookie: req.signedCookies.cookie }, function (err, result) {
            if ( err || !result ) {
                res.clearCookie('cookie');
                res.render('register', { loggedIn: false, error: "" });

                return;
            }

            res.redirect('/main');
        });

        return;
    }

    res.render('register', { loggedIn: false, error: "" });
});

router.post('/', function(req, res) {
    var name = req.body.userName;
    var pass = req.body.pass;

    req.db.collection('users').findOne({ user: name }, function (err, result) {
        if ( !err || result ) {
            res.render('register', { loggedIn: false, error: "That username is already in use." });
            return;
        }

        var salt = crypto.randomBytes(32).toString('base64');
        var iters = 10000;
        var hash = crypto.pbkdf2Sync(pass, salt, iters, 512);

        req.db.collection('users').insertOne({
            user: name,
            hash: hash,
            iters: iters,
            salt: salt
        }, function (err, result) {
            if ( err || !result ) {
                res.render('register', { loggedIn: false, error: "There was an error creating your account." });
                return;
            }

            res.redirect('/login');
        })
    });
});

module.exports = router;
