const express = require('express');
const CommentService = require('../../service/CommentService');
const { asyncHandler, sendMsg } = require('../util/util');

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const userName = req.query.userName || "";
    const email = req.query.email || "";
    const ArticleId = req.query.ArticleId || "";

    return await CommentService.findByPageComment(page, limit, {
        userName,
        email,
        ArticleId
    })
}))

router.post('/', asyncHandler(async (req, res) => {
    return await CommentService.addComment(req.body);
}))

router.put('/:id', asyncHandler(async (req, res) => {
    return await CommentService.updateComment(req.params.id, req.body)
}))

router.delete('/:id', asyncHandler(async (req, res) => {
    return await CommentService.deleteComment(req.params.id);
}))

module.exports = router;