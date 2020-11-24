const { DataTypes } = require('sequelize');
const sequelize = require('../db');

/**
 * 评论回复表
 */
module.exports = sequelize.define('Reply', {
    content: {
        type: DataTypes.STRING(1000),
        allowNull: false
    },
    userName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    createdAt: true,
    updatedAt: true,
    paranoid: true
})