const express = require('express');
const router = express.Router();

const informController = require('../controllers/informController.js');

router.get('/', informController.getAll); //공지게시판 메인
router.get('/detail/:post_id', informController.detail); //


module.exports = router;