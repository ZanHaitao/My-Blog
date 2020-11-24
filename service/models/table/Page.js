const { DataTypes } = require('sequelize');
const sequelize = require('../db');

/**
 * 页面表
 */
module.exports = sequelize.define('Page', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    describe: {
        type: DataTypes.STRING(1000),
        allowNull: false
    },
    content: {
        type: DataTypes.STRING(10000),
        allowNull: false
    },
    cover: {
        type: DataTypes.STRING(1000),
        allowNull: false
    },
    pageName: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    createdAt: true,
    updatedAt: true,
    paranoid: true
})