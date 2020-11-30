const express = require('express');
const ConfigService = require('../../service/ConfigService');
const { asyncHandler, sendMsg } = require('../util/util');

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
    return await ConfigService.getConfigDetail()
}))

router.put('/', asyncHandler(async (req, res) => {
    return await ConfigService.updateConfig(req.body)
}))

module.exports = router;