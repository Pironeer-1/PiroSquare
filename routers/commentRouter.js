const express = require('express');
const router = express.Router();

const commentController = require('../controllers/commentController.js');

router.post('/create/:post_id', commentController.createComment);
router.post('/delete/:comment_id', commentController.deleteComment);
router.post('/reply/create/:comment_id', commentController.createReply); //대댓글 생성
module.exports=router;