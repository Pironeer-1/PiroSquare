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

const questionController = require('../controllers/questionController.js');

router.get('/', questionController.getAll);
router.get('/search', questionController.filteringPost);
router.get('/create', questionController.createForm);
router.post('/create', upload.single('image'), questionController.createPost);
router.get('/read/:post_id', questionController.detailPost);
router.get('/detail/:post_id', questionController.detailPost);
router.post('/delete/:post_id', questionController.deletePost);
router.get('/update/:post_id', questionController.updateForm);
router.post('/update/:post_id', upload.single('image'), questionController.updatePost);

module.exports = router;