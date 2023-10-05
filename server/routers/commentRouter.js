const express = require('express');
const router = express.Router();
const multer = require('multer');
const { v4: uuidv4 } = require('uuid'); 

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/comment/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + uuidv4();
        const fileExtension = file.originalname.split('.').pop();
        const filename = `${uniqueSuffix}.${fileExtension}`;
        cb(null, filename);
    },
});
const upload = multer({ storage: storage });

const commentController = require('../controllers/commentController.js');

router.post('/create/:post_id', upload.single('image'), commentController.createComment);
router.post('/delete/:comment_id', commentController.deleteComment);
router.post('/reply/create/:comment_id', upload.single('image'), commentController.createReply); //대댓글 생성
router.post('/reply/delete/:comment_id', commentController.deleteReply); //대댓글 삭제
module.exports=router;