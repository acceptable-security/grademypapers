var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    if ( req.signedCookies === undefined || req.signedCookies.cookie === undefined ) {
        res.render('index', { loggedIn: false });
        return;
    }

    req.db.collection('users').findOne({ cookie: req.signedCookies.cookie }, function (err, result) {
        if ( err || !result ) {
            res.render('index', { loggedIn: false });
            return;
        }

        res.render('index', { loggedIn: true });
    });
});

module.exports = router;
