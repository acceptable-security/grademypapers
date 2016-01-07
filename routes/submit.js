var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    res.render('submit', {});
});

router.post('/', function(req, res) {
    res.send('submit post');
});

module.exports = router;
