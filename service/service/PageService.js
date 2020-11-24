/**
 * 文章服务
 */

const Label = require('../models/table/Label');
const { pick } = require('../util/propertayHelper');

exports.addLabel = async function(options) {
    options = pick(options, 'title', 'content', 'describe', 'pageName', 'cover');
    const result = await Label.create(options);
    return result.toJSON();
}

exports.updateLabel = async function(id, options) {
    options = pick(options, 'title', 'content', 'describe', 'pageName', 'cover');
    return await Label.update(options, {
        where: {
            id
        }
    });
}

exports.deleteLabel = async function(id) {
    return await Label.destroy({
        where: {
            id,
        }
    })
}


exports.findByPageLabel = async function(page = 1, limit = 10, pageName = "") {

    const where = {};

    if (pageName !== "") {
        where.pageName = pageName;
    }

    const result = await Label.findAndCountAll({
        where,
        offset: (page - 1) * limit,
        limit: +limit
    });

    return {
        count: result.count,
        data: JSON.parse(JSON.stringify(result.rows))
    }
}