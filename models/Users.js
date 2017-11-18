const Sequelize = require('sequelize');
var config = require('../config.json').database

const sequelize = new Sequelize(config.type+'://'+config.username+':'+config.password+'@'+config.host+':'+config.port+'/'+config.dbname);

const User = sequelize.define('users', {
    full_name: Sequelize.STRING,
    username: Sequelize.STRING,
    level: Sequelize.TEXT,
    auth_token: Sequelize.TEXT,
    is_login: Sequelize.INTEGER,
    password: Sequelize.STRING
});

module.exports = User;