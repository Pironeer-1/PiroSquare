const express = require('express');
const router = express.Router();

const commentController = require('../controllers/commentController.js');

router.post('/create/:post_id', commentController.createComment);
router.post('/delete/:comment_id', commentController.deleteComment);
router.post('/reply/create/:comment_id', commentController.createReply); //대댓글 생성
router.post('/reply/delete/:comment_id', commentController.deleteReply); //대댓글 삭제
module.exports=router;