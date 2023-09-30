const express = require('express');
const router = express.Router();

const recruitController = require('../controllers/recruitController.js');

router.get('/', recruitController.getAll);
router.post('/', recruitController.filteringPost);
router.get('/detail/:post_id', recruitController.detail);
router.get('/create', recruitController.createRecruit);
router.post('/create', recruitController.createNewRecruit);
router.post('/delete/:post_id', recruitController.deleteRecruit);
router.get('/update/:post_id', recruitController.updateRecruit);
router.post('/update/:post_id', recruitController.updateNewRecruit);

module.exports = router;