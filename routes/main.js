var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    res.render('main', {});
});

router.post('/', function(req, res) {
    res.send('main post');
});

module.exports = router;
