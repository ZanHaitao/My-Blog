const { DataTypes } = require('sequelize');
const sequelize = require('../db');

/**
 * 二级页面表
 */
module.exports = sequelize.define('SecondPage', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    createdAt: true,
    updatedAt: true,
    paranoid: true
})