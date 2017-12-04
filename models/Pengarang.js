const Sequelize = require('sequelize');
var config = require('../config.json').database;

const sequelize = new Sequelize(config.type+'://'+config.username+':'+config.password+'@'+config.host+':'+config.port+'/'+config.dbname);

const Pengarang = sequelize.define('pengarang', {
    nama : Sequelize.STRING,
    detail : Sequelize.STRING
},{
    tableName : 'pengarang'
});

module.exports = Pengarang;