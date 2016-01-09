var express = require('express');
var router = express.Router();

// function setupDB(db) {
//     db.counters.insert({
//         _id: "userid",
//         seq: 0
//     });
// }
//
// function getNextSequence(name) {
//     var ret = db.counters.findAndModify({
//         query: { _id: name },
//         update: { $inc: { seq: 1 } },
//         new: true
//     });
//
//     return ret.seq;
// }

//         var salt = crypto.randomBytes(32).toString('base64');
//         var iters = 10000;
//         var hash = crypto.pbkdf2Sync(pass, salt, iters, 512);
//
//         var id = getNextSequence("userid");
//
//         db.users.insertOne({
//             _id: id,
//             user: user,
//             hash: hash,
//             iters: iters,
//             salt: salt,
//             cookie: ""
//         });

router.get('/', function(req, res) {
    res.render('register', {});
});

router.post('/', function(req, res) {
    res.send('register post');
});

module.exports = router;
