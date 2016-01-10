var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    if ( req.signedCookies !== undefined && req.signedCookies.cookie !== undefined ) {
        req.db.collection('users').updateOne({ cookie: req.signedCookies.cookie }, { $set: { cookie: "" } }, function (err, result) {
            res.clearCookie('cookie');
            res.redirect('/');
        });

        return;
    }

    res.redirect('/');
});

module.exports = router;
