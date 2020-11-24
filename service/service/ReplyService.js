/**
 * 回复服务
 */
const Comment = require('../models/table/Comment');
const Reply = require('../models/table/Reply');
const { pick } = require('../util/propertayHelper');
const { Op } = require("sequelize");

exports.addReply = async function(options) {
    options = pick(options, 'userName', 'email', 'content', 'CommentId');
    const result = await Reply.create(options);
    return result.toJSON();
}

exports.updateReply = async function(id, options) {
    options = pick(options, 'userName', 'email', 'content', 'CommentId');
    return await Reply.update(options, {
        where: {
            id,
        }
    })
}

exports.deleteReply = async function(id) {
    return await Reply.destroy({
        where: {
            id
        }
    })
}

exports.findByPage = async function(page = 1, limit = 10, options = {}) {
    if (typeof options !== 'object') {
        throw new Error('配置参数错误！')
    }

    options = pick(options, 'userName', 'email', 'CommentId');

    const where = {};

    if ('userName' in options && options.userName) {
        where.userName = {
            [Op.like]: `%${options.userName}%`
        }
    }

    if ('email' in options && options.email) {
        where.email = options.email;
    }

    if ('CommentId' in options && options.CommentId) {
        where.CommentId = options.CommentId;
    }

    const result = await Reply.findAndCountAll({
        where,
        offset: (page - 1) * limit,
        limit: +limit,
        include: Comment
    });

    return {
        count: result.count,
        data: JSON.parse(JSON.stringify(result.rows))
    }
}