const express = require('express');
const FirstPageService = require('../../service/FirstPageService');
const { asyncHandler, sendMsg } = require('../util/util');

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
    return await FirstPageService.findAllFirstPage();
}))

router.post('/', asyncHandler(async (req, res) => {
    return await FirstPageService.addFirstPage(req.body)
}))

router.put('/:id', asyncHandler(async (req, res) => {
    return await FirstPageService.updateFirstPage(req.params.id, req.body)
}))

router.delete('/:id', asyncHandler(async (req, res) => {
    return await FirstPageService.deleteFirstPage(req.params.id);
}))

module.exports = router;