const express = require('express');
const UserService = require('../../service/UserService');
const { asyncHandler, sendMsg } = require('../util/util');
const jwt = require('../util/jwt');

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
    return await UserService.getUser()
}))

router.put('/', asyncHandler(async (req, res) => {
    return await UserService.updateUser(req.body)
}))

router.post('/login', asyncHandler(async (req, res) => {
    const result = await UserService.loginUser(req.body.loginId, req.body.loginPwd)
    if (result) {
        jwt.publish(res, undefined, {
            loginId: req.body.loginId,
            loginPwd: req.body.loginPwd
        });
    }
    return result;
}))

router.post('/whoami', asyncHandler(async (req, res) => {
    if (req.token.UserInfo) {
        const info = req.token.UserInfo;
        const result = await UserService.loginUser(info.loginId, info.loginPwd);
        if (result) {
            return result;
        }else{
            res.status(403).send(null);
        }
    } else {
        res.send(null);
        return;
    }
}))

module.exports = router;