var validator = require('validator');

exports.validation  = function (req, res, param) {
    req.checkBody("leader_email", "Enter a valid email address.").isEmail();
    var errors = req.validationErrors();
    if (errors) {
        res.send(errors);
        return;
    } else {
        // normal processing here
    }
}
exports.resErr = function (res, status, message, data) {
    if(!data) data=null
    res.json({status:status, message:message, data:data});

}