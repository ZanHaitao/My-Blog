const express = require('express');
const EveryDayService = require('../../service/EveryDayService');
const { asyncHandler, sendMsg } = require('../util/util');

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    return await EveryDayService.findByPageEveryDay(page, limit);
}))

router.post('/', asyncHandler(async (req, res) => {
    return await EveryDayService.addEveryDay(req.body)
}))

router.put('/:id', asyncHandler(async (req, res) => {
    return await EveryDayService.updateEveryDay(req.params.id, req.body)
}))

router.delete('/:id', asyncHandler(async (req, res) => {
    return await EveryDayService.deleteEveryDay(req.params.id);
}))

router.get('/once', asyncHandler(async (req, res) => {
    return await EveryDayService.getEveryDay();
}))

module.exports = router;