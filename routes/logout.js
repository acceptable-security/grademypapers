var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    if ( req.signedCookies.cookie !== undefined ) {
        req.db.users.updateOne({ cookie: req.signedCookies.cookie }, { cookie: "" }, function (err, res) {
            res.clearCookie('cookie');
            res.redirect('/');
        });

        return;
    }

    res.redirect('/');
});

module.exports = router;
