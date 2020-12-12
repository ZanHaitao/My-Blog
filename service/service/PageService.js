/**
 * 文章服务
 */

const Page = require('../models/table/Page');
const { pick } = require('../util/propertayHelper');

exports.addPage = async function(options) {
    options = pick(options, 'title', 'content', 'describe', 'pageName', 'cover');
    const result = await Page.create(options);
    return result.toJSON();
}

exports.updatePage = async function(id, options) {
    options = pick(options, 'title', 'content', 'describe', 'pageName', 'cover');
    return await Page.update(options, {
        where: {
            id
        }
    });
}

exports.deletePage = async function(id) {
    return await Page.destroy({
        where: {
            id,
        }
    })
}

exports.findByIdPage = async function(id) {
    const result = await Page.findByPk(id)

    if (result) {
        return result.toJSON();
    }

    return null;
}

exports.findByPagePage = async function(page = 1, limit = 10, pageName = "") {

    const where = {};

    if (pageName !== "") {
        where.pageName = pageName;
    }

    const result = await Page.findAndCountAll({
        where,
        offset: (page - 1) * limit,
        limit: +limit
    });

    return {
        count: result.count,
        data: JSON.parse(JSON.stringify(result.rows))
    }
}