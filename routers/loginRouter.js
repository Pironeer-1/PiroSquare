const express = require('express');
const router = express.Router();

const loginController = require('../controllers/loginController.js');

router.get('/login/process', loginController.detailPost);

module.exports = router;