/**
 * 文章类型服务
 */

const AritcleType = require('../models/table/ArticleType');
const { pick } = require('../util/propertayHelper');

exports.addAritcleType = async function(options) {
    options = pick(options, 'title');
    const result = await AritcleType.create(options);
    return result.toJSON();
}

exports.updateAritcleType = async function(id, options) {
    options = pick(options, 'title');
    return await AritcleType.update(options, {
        where: {
            id,
        }
    })
}

exports.deleteAritcleType = async function(id) {
    return await AritcleType.destroy({
        where: {
            id,
        }
    })
}

exports.getAritcleTypeList = async function() {
    const result = await AritcleType.findAll();
    return JSON.parse(JSON.stringify(result))
}