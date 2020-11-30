const express = require('express');
const ReplyService = require('../../service/ReplyService');
const { asyncHandler, sendMsg } = require('../util/util');

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const userName = req.query.userName || "";
    const email = req.query.email || "";
    const CommentId = req.query.CommentId || "";

    return await ReplyService.findByPageReply(page, limit, {
        userName,
        email,
        CommentId
    })
}))

router.post('/', asyncHandler(async (req, res) => {
    return await ReplyService.addReply(req.body);
}))

router.put('/:id', asyncHandler(async (req, res) => {
    return await ReplyService.updateReply(req.params.id, req.body)
}))

router.delete('/:id', asyncHandler(async (req, res) => {
    return await ReplyService.deleteReply(req.params.id);
}))

module.exports = router;