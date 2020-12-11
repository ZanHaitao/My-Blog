/**
 * 评论服务
 */
const Comment = require('../models/table/Comment');
const Article = require('../models/table/Article');
const { pick } = require('../util/propertayHelper');
const { Op } = require("sequelize");

exports.addComment = async function(options) {
    options = pick(options, 'userName', 'email', 'content','ArticleId');
    const result = await Comment.create(options);
    return result.toJSON();
}

exports.updateComment = async function(id, options) {
    options = pick(options, 'userName', 'email', 'content','ArticleId');
    return await Comment.update(options, {
        where: {
            id,
        }
    })
}

exports.deleteComment = async function(id) {
    return await Comment.destroy({
        where: {
            id
        }
    })
}

exports.findByPageComment = async function(page = 1, limit = 10, options = {}) {
    if (typeof options !== 'object') {
        throw new Error('配置参数错误！')
    }

    options = pick(options, 'ArticleId', 'userName', 'email', 'order');

    const where = {};
    let order = [];
    if ('order' in options && options.order != 0) {
        order = [
            ['id', 'DESC']
        ]
    }

    if ('userName' in options && options.userName) {
        where.userName = {
            [Op.like]: `%${options.userName}%`
        }
    }

    if ('email' in options && options.email) {
        where.email = options.email;
    }

    if ('ArticleId' in options && options.ArticleId) {
        where.ArticleId = options.ArticleId;
    }

    const result = await Comment.findAndCountAll({
        where,
        offset: (page - 1) * limit,
        limit: +limit,
        include: Article,
        order,
    });

    return {
        count: result.count,
        data: JSON.parse(JSON.stringify(result.rows))
    }
}