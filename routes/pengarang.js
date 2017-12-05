var express      = require('express'),
    router       = express.Router(),
    helper       = require('../helper/response'),
    messages     = require('../messages');
const Sequelize  = require('sequelize');

var Pengarng     = require('../models/Pengarang');

router.get('/:id?', function (req, res) {

    if (req.params.id) { //<-- return one pengarang
        Pengarng.findOne({where:{id:req.params.id}}).then(result => {
            if (result) {
                helper.resErr(res, 200, 'Pengarang is succesfuly found', result)
            } else {
                helper.resErr(res, 204, 'Pengarang not found', result)
            }
        }).catch(function (err) {
            helper.resErr(res, 500, 'Pengarang is not found', err.errors[0])
        });
    } else {
        Pengarng.findAll().then(result => {
            if (result) {
                helper.resErr(res, 200, 'Pengarang is succesfuly found', result)
            } else {
                helper.resErr(res, 204, 'Pengarang not found', result)
            }
        }).catch(function (err) {
            helper.resErr(res, 500, 'Pengarang is not found', err.errors[0])
        });
    }
});

router.post("/", function (req, res) {
    req.checkBody("nama", messages.required).notEmpty();
    req.checkBody("detail", messages.required).notEmpty();

    var errors = req.validationErrors();
    if (errors) {
        helper.resErr(res, 200, errors[0].param+errors[0].msg);
        return;
    } else {
        body = {
            nama    : req.body.nama,
            detail  : req.body.detail
        };

        Pengarng.create(body).then(result => {
            helper.resErr(res, 200, 'success add new pengarang', result)
        }).catch(err => {
            helper.resErr(res, 200, 'id already exsist', err.errors[0])
        });
    }
});

router.put("/:id?", (req, res) => {
    body = {
        nama    : req.body.nama,
        detail  : req.body.detail
    }

    Pengarng.update(body, {where:{id:req.params.id}}).then(result => {
        if (result[0] === 1) {
            helper.resErr(res, 200, "Success Update Data");
        } else {
            helper.resErr(res, 200, "Error Update Data");
        }
    });
});

router.delete("/:id?", (req, res) => {
    Pengarng.destroy({where:{id:req.params.id}}).then(function (result) {
        if (result === 1) {
            helper.resErr(res, 200, "Successfully deleting data");
        } else {
            helper.resErr(res, 200, "Failed deleting data");
        }
    });
});

module.exports = router;