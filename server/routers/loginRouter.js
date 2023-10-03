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

const loginController = require('../controllers/loginController.js');

router.get('/logout', loginController.logoutProcess);
router.get('/newUser', loginController.newUser);
router.post('/newUserProfile', upload.single('image'), loginController.newUserProfile);

module.exports = router;