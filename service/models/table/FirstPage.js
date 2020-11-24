const { DataTypes } = require('sequelize');
const sequelize = require('../db');

/**
 * 一级页面表
 */
module.exports = sequelize.define('FirstPage', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    createdAt: true,
    updatedAt: true,
    paranoid: true
})