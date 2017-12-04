var express = require('express');
var router = express.Router();
const Sequelize = require('sequelize');
var helper = require('../helper/response');
var messages = require('../messages');
//loas models
var buku = require('../models/Buku'),
    Pengarang = require('../models/Pengarang'),
    Penerbit    = require('../models/Penerbit')

router.get('/list/:id?', function (req, res, next) {
    if (req.params.id) {
        buku.findOne({where:{id:req.params.id}}).then(function (result) {
            if (result) {
                helper.resErr(res, 200, 'Buku is succesfuly found', result)
            } else {
                helper.resErr(res, 200, 'Buku not found', result)
            }

        }).catch(function (err) {
            helper.resErr(res, 500, 'Buku is not found', err.errors[0])
        });
    } else {
        let limit = 10;   // number of records per page
        let offset = 0;
        buku.findAndCountAll().then(function (sum) {
            let page = 1
            if (req.query.page) {
                page = req.query.page;      // page number
            }
            let pages = Math.ceil(sum.count / limit);
                offset = limit * (page - 1);
            buku.findAll({
                limit: limit,
                offset: offset,
                $sort: { id: 1 },
                include: [
                    { model: Pengarang, as: 'Pengarang'},
                    { model: Penerbit, as: 'Penerbit'}
                ]
            }).then(function (result) {
                result = {
                    totalPages:pages,
                    currentPage:parseInt(page),
                    data:result
                }
                helper.resErr(res, 200, 'Buku is succesfuly found ', result)
            }).catch(function (err) {
                helper.resErr(res , 500, 'Buku is not found', err.errors)
            });
        });
    }

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
        var date = new Date();
        var dateTime = date.getFullYear()+date.getMonth()+date.getDay()+date.getHours()+date.getMinutes()+date.getMilliseconds();
        var name = require('crypto').createHash('md5').update(dateTime.toString()).digest('hex');
         data = {
             id : "BUKU-"+name,
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

router.put('/update/:id', function (req, res, next) {
    data = {
        judul           :req.body.judul,
        pengarang       :req.body.penerbit,
        tahun_terbit    :req.body.tahun_terbit,
        isbn            :req.body.isbn
    };
    buku.update(data, {where:{id:req.params.id}}).then(function (result) {
        if (result[0] === 1) {
            helper.resErr(res, 200, "Success Update Data");
        } else {
            helper.resErr(res, 200, "Error Update Data");
        }
    });
});

router.delete('/delete/:id', function (req, res, next) {
    buku.destroy({where:{id:req.params.id}}).then(function (result) {
         if (result === 1) {
             helper.resErr(res, 200, "Successfully deleting data");
         } else {
             helper.resErr(res, 200, "Failed deleting data");
         }
    });
});

module.exports = router;
