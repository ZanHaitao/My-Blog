const { DataTypes } = require('sequelize');
const sequelize = require('../db');

/**
 * 标签表
 */
module.exports = sequelize.define('Label', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    createdAt: true,
    updatedAt: true,
    paranoid: true
})