const express = require('express');
const LabelService = require('../../service/LabelService');
const { asyncHandler, sendMsg } = require('../util/util');

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
    return await LabelService.getLabelList();
}))

router.get('/list', asyncHandler(async (req, res) => {
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    return await LabelService.findByPageLabel(page, limit);
}))

router.post('/', asyncHandler(async (req, res) => {
    return await LabelService.addLabel(req.body)
}))

router.put('/:id', asyncHandler(async (req, res) => {
    return await LabelService.updateLabel(req.params.id, req.body)
}))

router.delete('/:id', asyncHandler(async (req, res) => {
    return await LabelService.deleteLabel(req.params.id);
}))

module.exports = router;