const { DataTypes } = require('sequelize');
const sequelize = require('../db');

/**
 * 网站信息表
 */
module.exports = sequelize.define('Config', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    logo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    service: {
        type: DataTypes.STRING,
        allowNull: false
    },
    record: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    createdAt: true,
    updatedAt: true,
    paranoid: true
})