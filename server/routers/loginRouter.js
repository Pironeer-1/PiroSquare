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

// const adminAuthenticationMiddleware = async (req, res, next) => {
//     const user = await req.user;
//     if (user && user.is_admin) {
//         console.log('허용');
//         next();
//     } else {
//         const error = new Error('Unauthorized');
//         error.status = 401;
//         next(error);
//     }
// }; 

const loginController = require('../controllers/loginController.js');

router.get('/logout', loginController.logoutProcess);
router.get('/newUser', loginController.newUser);
router.post('/newUserProfile', upload.single('image'), loginController.newUserProfile);

// router.use(adminAuthenticationMiddleware);

router.get('/manageUsers', loginController.manageUsers);
router.post('/activate/:user_id', loginController.activateUser);
router.post('/deactivate/:user_id', loginController.deactivateUser);

module.exports = router;