var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    if ( req.signedCookies.cookie === undefined ) {
        res.redirect('/login');
        return;
    }

    req.db.users.findOne({ cookie: req.signedCookies.cookie }, function (err, res) {
        if ( err || !res ) {
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
