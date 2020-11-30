/**
 * 用户服务
 */
const User = require('../models/table/User');
const { pick } = require('../util/propertayHelper');

exports.getUser = async function() {
    const result = await User.findByPk(1);
    return result.toJSON();
}

exports.loginUser = async function(loginId, loginPwd) {
    const result = await User.findOne({
        where: {
            loginId,
            loginPwd
        }
    });

    if (result) {
        return result.toJSON();
    }
    return null;
}

exports.updateUser = async function(options) {
    options = pick(options, 'loginId', 'loginPwd', 'userName', 'userInfo', 'userPortrait', 'email', 'github');
    return await User.update(options, {
        where: {
            id: 1
        }
    })
}