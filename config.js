var fs = require('fs');
var crypto = require('crypto');

function getCookieSecret(callback) {
    var file = ".cookiesecret";

    fs.stat(file, function (err, stat) {
        if ( err == null ) {
            callback(null, fs.readFileSync(file).toString());
        }
        else {
            if ( err.code != 'ENOENT' ) {
                callback(err, undefined);
            }
            else {
                var secret = crypto.randomBytes(32).toString('base64');

                fs.writeFileSync(file, secret, {}, function (err) {
                    if ( err ) throw err;

                    callback(null, secret);
                });
            }
        }
    });
}

module.exports = {
    cookieSecret: getCookieSecret,
    mongo: "mongodb://localhost:27017/test"
};
