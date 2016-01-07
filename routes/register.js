var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    res.render('register', {});
});

router.post('/', function(req, res) {
    res.send('register post');
});

module.exports = router;
