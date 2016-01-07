var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    res.render('view', {});
});

router.post('/', function(req, res) {
    res.send('view essay post');
});

module.exports = router;
