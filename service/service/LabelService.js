/**
 * 标签服务
 */

const Label = require('../models/table/Label');
const { pick } = require('../util/propertayHelper');

exports.addLabel = async function(options) {
    options = pick(options, 'title');
    const result = await Label.create(options);
    return result.toJSON();
}

exports.updateLabel = async function(id, options) {
    options = pick(options, 'title');
    return await Label.update(options, {
        where: {
            id,
        }
    })
}

exports.deleteLabel = async function(id) {
    return await Label.destroy({
        where: {
            id,
        }
    })
}

exports.getLabelList = async function() {
    const result = await Label.findAll();
    return JSON.parse(JSON.stringify(result))
}