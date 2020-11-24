const { DataTypes } = require('sequelize');
const sequelize = require('../db');

/**
 * 文章类型表
 */
module.exports = sequelize.define('ArticleType', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    createdAt: true,
    updatedAt: true,
    paranoid: true
})