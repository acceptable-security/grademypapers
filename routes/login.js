var express = require('express');
var crypto = require('crypto');
var router = express.Router();

router.get('/', function(req, res) {
    if ( req.signedCookies !== undefined && req.signedCookies.cookie !== undefined ) {
        req.db.collection('users').findOne({ cookie: req.signedCookies.cookie }, function (err, res) {
            if ( !res ) {
                res.clearCookie('cookie');
                res.render('login', { loggedIn: false, error: "" });

                return;
            }

            res.redirect('/main');
        });

        return;
    }

    res.render('login', { loggedIn: false, error: "" });
});

router.post('/', function(req, res) {
    // should we do something about if they are logged in or not?
    // ignoring for now
    var name = req.body.userName;
    var pass = req.body.password;

    req.db.collection('users').findOne({ user: name }, function (err, result) {
        if ( !result ) {
            res.render('login', { loggedIn: false, error: "Those credentials don't exist." });
            return;
        }

        var salt = result.salt;
        var iters = result.iters;
        var hash = crypto.pbkdf2Sync(pass, salt, iters, 512).toString('base64');

        if ( result.hash == hash ) {
            var cookie = crypto.randomBytes(32).toString('base64');

            req.db.collection('users').updateOne({ user: name }, { $set: { cookie: cookie } }, function (err, result) {
                if ( !result ) {
                    res.render('login', { loggedIn: false, error: "An error has occured logging you in." });
                    return;
                }

                res.cookie('cookie', cookie, {
                    expires: new Date(Date.now() + 1 * 60 * 60 * 1000), // 1 hour
                    httpOnly: true,
                    signed: true
                });

                res.redirect('/main');
            });
        }
        else {
            res.render('login', { loggedIn: false, error: "Those credentials don't exist." });
            return;
        }
    });
});

module.exports = router;
