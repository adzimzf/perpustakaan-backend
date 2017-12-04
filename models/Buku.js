const Sequelize = require('sequelize');
var config      = require('../config.json').database;
var Pengarang   = require('./Pengarang'),
    Penerbit    = require('./Penerbit');

const sequelize = new Sequelize(config.type+'://'+config.username+':'+config.password+'@'+config.host+':'+config.port+'/'+config.dbname);

const Buku = sequelize.define('buku', {
    judul : Sequelize.STRING,
    PengarangId : Sequelize.INTEGER,
    PenerbitId : Sequelize.INTEGER,
    tahun_terbit : Sequelize.DATE,
    isbn : Sequelize.STRING
},{
    tableName : 'buku'
});

Buku.belongsTo(Pengarang, {as: 'Pengarang'});
Buku.belongsTo(Penerbit, {as: 'Penerbit'});
module.exports = Buku;