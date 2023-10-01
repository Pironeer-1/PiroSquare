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

const postController = require('../controllers/postController.js');

router.get('/', postController.getAll); //자유게시판 메인
router.post('/', postController.searchPost); //검색하기
router.get('/detail/:post_id', postController.detailPost);
router.get('/create', postController.createPost);
router.post('/create', upload.single('image'), postController.createNewPost);
router.post('/delete/:post_id', postController.deletePost);
router.get('/update/:post_id', postController.updatePost);
router.post('/update/:post_id', upload.single('image'), postController.updateNewPost);

module.exports = router;