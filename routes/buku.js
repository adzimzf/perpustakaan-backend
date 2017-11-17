var express = require('express');
var router = express.Router();
const Sequelize = require('sequelize');
var helper = require('../helper/response')
var messages = require('../messages')
//loas models
var buku = require('../models/Buku');

router.get('/list/:id?', function (req, res, next) {
    buku.findAll().then(function (result) {
        helper.resErr(res, 200, 'Buku is succesfuly found', result)
    }).catch(function (err) {
        helper.resErr(res, 200, 'Buku is not found', err.errors[0])
    })
});

router.post('/tambah', function (req, res, next) {
    req.checkBody("judul", messages.required).notEmpty();
    req.checkBody("pengarang", messages.required).notEmpty();
    req.checkBody("penerbit", messages.required).notEmpty();
    req.checkBody("tahun_terbit", messages.required).notEmpty();
    req.checkBody("isbn", messages.required).notEmpty();

    var errors = req.validationErrors();
    if (errors) {
        helper.resErr(res, 200, errors[0].param+errors[0].msg);
        return;
    } else {
        // store book information
         data = {
             id : "BUKU-XASE577DGDG677",
            judul : req.body.judul,
            penerbit : req.body.penerbit,
            pengarang : req.body.pengarang,
            tahun_terbit : req.body.tahun_terbit,
            isbn : req.body.isbn
         };
        buku.create(data).then(function (result) {
            helper.resErr(res, 200, 'success add new book', result)
        }).catch(function (err) {
            helper.resErr(res, 200, 'id already exsist', err.errors[0])
        });

    }
});

module.exports = router;
