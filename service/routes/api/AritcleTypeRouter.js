const express = require('express');
const AritcleTypeService = require('../../service/AritcleTypeService');
const { asyncHandler, sendMsg } = require('../util/util');

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
    return await AritcleTypeService.getAritcleTypeList();
}))

router.post('/', asyncHandler(async (req, res) => {
    return await AritcleTypeService.addAritcleType(req.body)
}))

router.put('/:id', asyncHandler(async (req, res) => {
    return await AritcleTypeService.updateAritcleType(req.params.id, req.body)
}))

router.delete('/:id', asyncHandler(async (req, res) => {
    return await AritcleTypeService.deleteAritcleType(req.params.id);
}))

module.exports = router;