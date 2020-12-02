const express = require('express');
const SecondPageService = require('../../service/SecondPageService');
const { asyncHandler, sendMsg } = require('../util/util');

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
    return await SecondPageService.findSecondPage(req.query.firstPageId);
}))

router.post('/', asyncHandler(async (req, res) => {
    return await SecondPageService.addSecondPage(req.body)
}))

router.put('/:id', asyncHandler(async (req, res) => {
    return await SecondPageService.updateSecondPage(req.params.id, req.body)
}))

router.delete('/:id', asyncHandler(async (req, res) => {
    return await SecondPageService.deleteSecondPage(req.params.id);
}))

module.exports = router;