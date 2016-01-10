var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    if ( req.signedCookies === undefined || req.signedCookies.cookie === undefined ) {
        res.redirect('/main');
        return;
    }

    req.db.collection('users').findOne({ cookie: req.signedCookies.cookie }, function (err, result) {
        if ( !result ) {
            res.redirect('/main');
            return;
        }

        /* DATA */
        res.render('main', { loggedIn: true /* TODO: WORK */ });
    });
});

router.post('/', function(req, res) {
    res.send('main post');
});

module.exports = router;
