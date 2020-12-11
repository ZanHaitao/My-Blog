const { DataTypes } = require('sequelize');
const sequelize = require('../db');

/**
 * 文章表
 */
module.exports = sequelize.define('Article', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.STRING(10000),
        allowNull: false
    },
    browse: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    isComment: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    isTop: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    cover: {
        type: DataTypes.STRING(2000),
        allowNull: true
    }
}, {
    createdAt: true,
    updatedAt: true,
    paranoid: true
})