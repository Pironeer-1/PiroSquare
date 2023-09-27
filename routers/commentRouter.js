const express = require('express');
const router = express.Router();

const commentController = require('../controllers/commentController.js');

router.post('/create/:post_id', commentController.createComment);
router.post('/delete/:comment_id', commentController.deleteComment);

module.exports=router;