const express = require('express');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid'); 

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/profile/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + uuidv4();
        const fileExtension = file.originalname.split('.').pop();
        const filename = `${uniqueSuffix}.${fileExtension}`;
        cb(null, filename);
    },
});
const upload = multer({ storage: storage });

const router = express.Router();

const mypageController = require('../controllers/mypageController.js');

router.get('/', mypageController.getUserInfo);
router.get('/updateUser', mypageController.updateUser);
router.post('/updateUser/:user_id', upload.single('image'), mypageController.updateNewUser);

module.exports = router;