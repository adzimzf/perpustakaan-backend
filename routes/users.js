var express = require('express');
var jwt    = require('jsonwebtoken');
var config = require('../config.json');
var router = express.Router();
const Sequelize = require('sequelize');
var helper = require('../helper/response');
var messages = require('../messages');
//loas models
var user = require('../models/Users');

router.post('/login', function (req, res, next) {
    req.checkBody("username", messages.required).notEmpty();
    req.checkBody("password", messages.required).notEmpty();

    var errors = req.validationErrors();
    if (errors) {
        helper.resErr(res, 300, errors[0].param+errors[0].msg);
        return;
    } else {
        // normal processing here
        user.findOne({where:{username:req.body.username}}).then(function (user) {
            handleLogin(req, res, user);
        });

    }
    function handleLogin(req, res, user) {
        if (user) {
            if (user.password === req.body.password) {
                if (!user.auth_token) token=generateToken(user); else token=user.auth_token;
                user.update({auth_token:token, is_login:1}).then(function (result) {
                    const payload = {
                        id: user.id
                    };
                    var token = jwt.sign(payload, config.jwt.secret_key);
                    result = {
                        data : result,
                        token: token
                    };
                    helper.resErr(res, 200, "Success Get Data", result);
                });
            } else {
                helper.resErr(res, 300, "Worng password")
            }
        } else {
            helper.resErr(res, 300, "Phone number or password wrong")
        }
    }

    function generateToken(user) {
        var date = new Date();
        var dateTime = date.getFullYear()+date.getMonth()+date.getDay()+date.getHours()+date.getMinutes()+date.getMilliseconds();
        return require('crypto').createHash('md5').update(user.id+user.username).digest('hex')+require('crypto').createHash('md5').update(dateTime.toString()).digest('hex');
    }
});

module.exports = router;
