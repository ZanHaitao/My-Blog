const { Sequelize } = require('sequelize');

module.exports = new Sequelize('myblog', 'root', '15556677737', {
    host: 'localhost',
    logging: false,
    dialect: 'mysql'
})