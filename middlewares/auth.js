var helper = require('../helper/response');
var jwt    = require('jsonwebtoken');
var config = require('../config.json');

module.exports = function (req, res, next) {
        //check header is full
        if (!req.header('Authorization')) {
            helper.resErr(res, 300, 'Unauthorized');
        } else {
            jwt.verify(req.header('Authorization'), config.jwt.secret_key, function (err, decode) {
                if (err) {
                    helper.resErr(res, 300, 'Unauthorized');
                } else {
                    req.decode = decode;
                    next();
                }
            });
        }
}