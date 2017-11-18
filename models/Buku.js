const Sequelize = require('sequelize');
var config = require('../config.json').database

const sequelize = new Sequelize(config.type+'://'+config.username+':'+config.password+'@'+config.host+':'+config.port+'/'+config.dbname);

const Buku = sequelize.define('buku', {
    judul : Sequelize.STRING,
    pengarang : Sequelize.INTEGER,
    penerbit : Sequelize.INTEGER,
    tahun_terbit : Sequelize.DATE,
    isbn : Sequelize.STRING
},{
    tableName : 'buku'
});

module.exports = Buku;