const express = require('express');
const router = express.Router();
const multer = require('multer');
const { v4: uuidv4 } = require('uuid'); 

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/post/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + uuidv4();
        const fileExtension = file.originalname.split('.').pop();
        const filename = `${uniqueSuffix}.${fileExtension}`;
        cb(null, filename);
    },
});
const upload = multer({ storage: storage });

const recruitController = require('../controllers/recruitController.js');

router.get('/', recruitController.getAll);
router.post('/', recruitController.filteringPost);
router.get('/detail/:post_id', recruitController.detail);
router.get('/create', recruitController.createRecruit);
router.post('/create', upload.single('image'), recruitController.createNewRecruit);
router.post('/delete/:post_id', recruitController.deleteRecruit);
router.get('/update/:post_id', recruitController.updateRecruit);
router.post('/update/:post_id', upload.single('image'), recruitController.updateNewRecruit);

module.exports = router;