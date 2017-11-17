var helper = require('../helper/response')

module.exports = function (req, res, next) {
        //check header is full
        if (!req.header('Authorization')) {
            helper.resErr(res, 300, 'Unauthorized');
        } else {
            console.log(req.header('Authorization'));
            next()
        }
}