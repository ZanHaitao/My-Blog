const express = require('express');
const UserService = require('../../service/UserService');
const { asyncHandler, sendMsg } = require('../util/util');

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
    return await UserService.getUser()
}))

router.put('/', asyncHandler(async (req, res) => {
    return await UserService.updateUser(req.body)
}))

router.post('/login', asyncHandler(async (req, res) => {
    return await UserService.loginUser(req.body.loginId, req.body.loginPwd)
}))

module.exports = router;