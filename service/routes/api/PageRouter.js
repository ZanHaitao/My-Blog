const express = require('express');
const PageService = require('../../service/PageService');
const { asyncHandler, sendMsg } = require('../util/util');

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
    const page = req.query.page;
    const limit = req.query.limit;
    const pageName = req.query.pageName;
    return await PageService.findByPagePage(page, limit, pageName);
}))

router.post('/', asyncHandler(async (req, res) => {
    return await PageService.addPage(req.body)
}))

router.put('/:id', asyncHandler(async (req, res) => {
    return await PageService.updatePage(req.params.id, req.body)
}))

router.delete('/:id', asyncHandler(async (req, res) => {
    return await PageService.deletePage(req.params.id);
}))

module.exports = router;