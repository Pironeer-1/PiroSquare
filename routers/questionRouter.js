const express = require('express');
const router = express.Router();

const questionController = require('../controllers/questionController.js');

router.get('/', questionController.getAll);
router.get('/search', questionController.filteringPost);
router.get('/create', questionController.createForm);
router.post('/create', questionController.createPost);
router.get('/detail/:post_id', questionController.detailPost);
router.post('/delete/:post_id', questionController.deletePost);
router.get('/update/:post_id', questionController.updateForm);
router.post('/update/:post_id', questionController.updatePost);

module.exports = router;