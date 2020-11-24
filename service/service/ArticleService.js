/**
 * 文章服务
 */
const Article = require('../models/table/Article');
const User = require('../models/table/User');
const ArticleType = require('../models/table/ArticleType');
const Label = require('../models/table/Label');
const { pick } = require('../util/propertayHelper');
const { Op } = require("sequelize");

exports.addArticle = async function(options) {
    options = pick(options, 'title', 'content', 'browse', 'isComment', 'isTop', 'cover', 'UserId', 'ArticleTypeId', 'LabelId');
    const result = await Article.create(options);
    return result.toJSON();
}

exports.updateArticle = async function(id, options) {
    options = pick(options, 'title', 'content', 'browse', 'isComment', 'isTop', 'cover', 'UserId', 'ArticleTypeId', 'LabelId');
    return await Article.update(options, {
        where: {
            id
        }
    });
}

exports.deleteArticle = async function(id) {
    return await Article.destroy({
        where: {
            id,
        }
    })
}

exports.findByIdArticle = async function(id) {
    const result = await Article.findByPk(id, {
        include: [
            User,
            ArticleType,
            Label
        ]
    })

    if (result) {
        return result.toJSON();
    }

    return null;
}

exports.findByPageArticle = async function(page = 1, limit = 10, options = {}) {
    if (typeof options !== 'object') {
        throw new Error('配置参数错误！')
    }
    options = pick(options, 'title', 'UserId', 'ArticleTypeId', 'LabelId', 'order');

    const where = {};
    const order = [];

    if ('order' in options && Array.isArray(options.order)) {
        order = options.order;
    }

    if ('title' in options && options.title) {
        where.title = {
            [Op.like]: `%${options.title}%`
        }
    }

    if ('UserId' in options && options.UserId) {
        where.UserId = options.UserId;
    }

    if ('ArticleTypeId' in options && options.ArticleTypeId) {
        where.ArticleTypeId = options.ArticleTypeId;
    }

    if ('LabelId' in options && options.LabelId) {
        where.LabelId = options.LabelId;
    }

    const result = await Article.findAndCountAll({
        where,
        offset: (page - 1) * limit,
        limit: +limit,
        include: [
            User,
            ArticleType,
            Label
        ],
        order,
    });

    return {
        count: result.count,
        data: JSON.parse(JSON.stringify(result.rows))
    }
}

/**
 * 访问浏览次数+1
 * @param {*} id 
 */
exports.addBrowse = async function(id) {
    const result = await Article.findByPk(id);
    if (result) {
        const browse = ++result.toJSON().browse;
        return await Article.update({
            browse,
        }, {
            where: {
                id
            }
        })
    }
    return null;
}