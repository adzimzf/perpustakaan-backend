const Sequelize = require('sequelize');
var config = require('../config.json').database

const sequelize = new Sequelize(config.type+'://'+config.username+':'+config.password+'@'+config.host+':'+config.port+'/'+config.dbname);

const Penerbit = sequelize.define('penerbit', {
    nama : Sequelize.STRING,
    detail : Sequelize.STRING
},{
    tableName : 'penerbit'
});

module.exports = Penerbit;