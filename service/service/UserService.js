/**
 * 用户服务
 */
const User = require('../models/table/User');
const { pick } = require('../util/propertayHelper');

exports.updateUser = async function(options) {
    options = pick(options, 'loginId', 'loginPwd', 'userName', 'userInfo', 'userPortrait', 'email', 'github');
    return await User.update(options, {
        where: {
            id: 1
        }
    })
}