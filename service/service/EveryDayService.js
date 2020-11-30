/**
 * 每日一句服务
 */
const EveryDay = require('../models/table/EveryDay');
const { pick } = require('../util/propertayHelper');

exports.addEveryDay = async function(options) {
    options = pick(options, 'content');
    const result = await EveryDay.create(options);
    return result.toJSON();
}

exports.updateEveryDay = async function(id, options = {}) {
    options = pick(options, 'content');
    return await EveryDay.update(options, {
        where: {
            id,
        }
    })
}

exports.deleteEveryDay = async function(id) {
    return await EveryDay.destroy({
        where: {
            id,
        }
    })
}

exports.findByPageEveryDay = async function(page = 1, limit = 10) {
    const result = await EveryDay.findAndCountAll({
        offset: (page - 1) * limit,
        limit: +limit
    })

    return {
        count: result.count,
        data: JSON.parse(JSON.stringify(result.rows))
    }
}

/**
 * 随机获取每日一句
 */
exports.getEveryDay = async function() {
    const result = await EveryDay.findAll();
    return result[Math.floor(Math.random() * result.length)];
}