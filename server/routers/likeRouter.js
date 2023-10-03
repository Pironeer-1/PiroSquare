const express = require('express');
const router = express.Router();

const likeController = require('../controllers/likeController.js');

router.post('/post/:post_id', likeController.postLikeAction);
router.post('/comment/:comment_id', likeController.commentLikeAction);

module.exports = router;