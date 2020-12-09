const express = require('express');
const ArticleService = require('../../service/ArticleService');
const { asyncHandler, sendMsg } = require('../util/util');

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const title = req.query.title || "";
    const UserId = req.query.UserId || "";
    const ArticleTypeId = req.query.ArticleTypeId || "";
    const LabelId = req.query.LabelId || "";
    const order = req.query.order || 0;
    const isTop = req.query.isTop || 0;
    return await ArticleService.findByPageArticle(page, limit, {
        title,
        UserId,
        ArticleTypeId,
        LabelId,
        order,
        isTop
    })
}))

router.get('/:id', asyncHandler(async (req, res) => {
    await ArticleService.addBrowse(req.params.id)
    return await ArticleService.findByIdArticle(req.params.id);
}))

router.post('/', asyncHandler(async (req, res) => {
    console.log(req.body);
    return await ArticleService.addArticle(req.body);
}))

router.put('/:id', asyncHandler(async (req, res) => {
    return await ArticleService.updateArticle(req.params.id, req.body)
}))

router.delete('/:id', asyncHandler(async (req, res) => {
    return await ArticleService.deleteArticle(req.params.id);
}))

module.exports = router;