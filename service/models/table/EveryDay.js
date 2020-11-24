const { DataTypes } = require('sequelize');
const sequelize = require('../db');

/**
 * 每日一句表
 */
module.exports = sequelize.define('EveryDay', {
    content: {
        type: DataTypes.STRING(1000),
        allowNull: false
    }
}, {
    createdAt: true,
    updatedAt: true,
    paranoid: true
})