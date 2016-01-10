var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    if ( req.signedCookies === undefined || req.signedCookies.cookie === undefined ) {
        res.redirect('/login');
        return;
    }

    req.db.collection('users').findOne({ cookie: req.signedCookies.cookie }, function (err, result) {
        if ( err || !result ) {
            res.redirect('/login');
            return;
        }

        /* DATA */
        res.render('login', { loggedIn: true /* TODO: WORK */ });
    });
});

router.post('/', function(req, res) {
    res.send('main post');
});

module.exports = router;
