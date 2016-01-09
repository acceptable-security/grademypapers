var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    if ( req.signedCookies.cookie === undefined ) {
        res.render('index', { loggedIn: false });
        return;
    }

    req.db.users.findOne({ cookie: req.signedCookies.cookie }, function (err, res) {
        if ( err || !res ) {
            res.render('index', { loggedIn: false });
            return;
        }

        res.render('index', { loggedIn: true });
    });
});

module.exports = router;
