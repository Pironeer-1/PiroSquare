//loginController.js
const passport = require('passport');
const loginModel = require('../models/loginModel');

module.exports = {
    logoutProcess: async (req, res) => {
        await req.logout(function(err) {
            if (err) { return next(err); }
            res.redirect('/');
        });
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