const express = require('express');
const router = express.Router();

const postController = require('../controllers/postController.js');

router.get('/detail/:post_id', postController.detailPost);
router.get('/create', postController.createPost);
router.post('/create', postController.createNewPost);
router.post('/delete/:post_id', postController.deletePost);
router.get('/update/:post_id', postController.updatePost);
router.post('/update/:post_id', postController.updateNewPost);

module.exports = router;