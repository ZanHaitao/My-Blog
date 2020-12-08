const util = require('../util/util');
const { pathToRegexp } = require('path-to-regexp');
const jwt = require('../util/jwt');

// 接口验证规则
const validationApi = require('../util/validationApi')

module.exports = (req, res, next) => {
    // 验证接口权限
    const validation = validationApi.filter(api => {
        const reg = pathToRegexp(api.path);
        return api.method == req.method && reg.test(req.path);
    });
    if (validation.length == 0) {
        next();
        return;
    }

    const result = jwt.verify(req);
    if (result) {
        req.token = {}
        req.token.UserInfo = {
            loginId: result.loginId,
            loginPwd: result.loginPwd
        };
        next();
    } else {
        res.status(403).send(util.sendMsg(403, "请登录后访问！"));
        return;
    }
}