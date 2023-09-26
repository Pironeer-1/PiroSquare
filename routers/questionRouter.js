const express = require('express');
const router = express.Router();

const questionController = require('../controllers/questionController.js');

// router.get('/', questionController.getAll);
router.get('/read/:post_id', questionController.detailPost);

module.exports = router;