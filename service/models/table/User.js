const { DataTypes } = require('sequelize');
const sequelize = require('../db');

/**
 * 用户表
 */
module.exports = sequelize.define('User', {
    loginId: {
        type: DataTypes.STRING,
        allowNull: false
    },
    loginPwd: {
        type: DataTypes.STRING,
        allowNull: false
    },
    userName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    userInfo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    userPortrait: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    github: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    createdAt: true,
    updatedAt: true,
    paranoid: true
})