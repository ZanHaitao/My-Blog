/**
 * 网站配置服务
 */
const Config = require('../models/table/Config');
const { pick } = require('../util/propertayHelper');

exports.updateConfig = async function(options = {}) {
    options = pick(options, 'title', 'logo', 'icon', 'service', 'record');
    return await Config.update(options, {
        where: {
            id: 1
        }
    })
}

exports.getConfigDetail = async function() {
    const result = await Config.findByPk(1);
    return result.toJSON();
}