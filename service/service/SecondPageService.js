/**
 * 二级页面类型服务
 */
const SecondPage = require('../models/table/SecondPage');
const FirstPage = require('../models/table/FirstPage');
const { pick } = require('../util/propertayHelper');

exports.addSecondPage = async function(options) {
    options = pick(options, 'title', 'FirstPageId');
    const result = await SecondPage.create(options);
    return result.toJSON();
}

exports.updateSecondPage = async function(id, options = {}) {
    options = pick(options, 'title', 'FirstPageId');
    return await SecondPage.update(options, {
        where: {
            id,
        }
    })
}

exports.deleteSecondPage = async function(id) {
    return await SecondPage.destroy({
        where: {
            id,
        }
    })
}

exports.findAllSecondPage = async function() {
    const result = await SecondPage.findAll({
        include: FirstPage
    });
    return JSON.parse(JSON.stringify(result));
}