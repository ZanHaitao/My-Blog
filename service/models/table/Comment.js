const { DataTypes } = require('sequelize');
const sequelize = require('../db');

/**
 * 评论表
 */
module.exports = sequelize.define('Comment', {
    userName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.STRING(1000),
        allowNull: false
    }
}, {
    createdAt: true,
    updatedAt: true,
    paranoid: true
})