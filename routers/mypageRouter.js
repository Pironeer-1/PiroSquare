const express = require('express');
const router = express.Router();

const mypageController = require('../controllers/mypageController.js');

router.get('/', mypageController.getUserInfo);
router.get('/updateUser', mypageController.updateUser);
router.post('/updateUser/:user_id', mypageController.updateNewUser);

module.exports = router;