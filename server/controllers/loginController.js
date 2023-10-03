//loginController.js
const passport = require('passport');
const loginModel = require('../models/loginModel');

module.exports = {
    logoutProcess: async (req, res) => {
        if (!req.session.passport.user) {
            res.status(400).send({ data: null, message: 'not authorized' });
        } else {
            req.session.destroy();      // 세션 삭제
            res.json({ data: null, message: 'ok' });
        }
    },
    newUser: async (req, res) => {
        res.render('mypage/newUserProfile.ejs');
    },
    newUserProfile: async (req, res) => {
        const user = await req.user;
        const loginUser = req.body;
        const imagePath = req.file ? `/user/${req.file.filename}` : '';
        await loginModel.newUserProfile(user, loginUser, imagePath);
        res.json({data: user, message: 'ok'});
    },
}