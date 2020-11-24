/**
 * 一级页面类型服务
 */
const FirstPage = require('../models/table/FirstPage');
const { pick } = require('../util/propertayHelper');

exports.addFirstPage = async function(options) {
    options = pick(options, 'title');
    const result = await FirstPage.create(options);
    return result.toJSON();
}

exports.updateFirstPage = async function(id, options = {}) {
    options = pick(options, 'title');
    return await FirstPage.update(options, {
        where: {
            id,
        }
    })
}

exports.deleteFirstPage = async function(id) {
    return await FirstPage.destroy({
        where: {
            id,
        }
    })
}

exports.findAllFirstPage = async function() {
    const result = await FirstPage.findAll();
    return JSON.parse(JSON.stringify(result));
}