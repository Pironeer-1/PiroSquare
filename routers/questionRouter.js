const express = require('express');
const router = express.Router();

const questionController = require('../controllers/questionController.js');

router.get('/', questionController.getAll);
router.post('/', questionController.filteringPost);
router.get('/create', questionController.createForm);
router.post('/create', questionController.createPost);
router.get('/read/:post_id', questionController.detailPost);
router.post('/delete/:post_id', questionController.deletePost);

module.exports = router;