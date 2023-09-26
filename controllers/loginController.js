//loginController.js
const loginModel = require("../models/loginModel");
const homeModel = require("../models/homeModel");

module.exports = {
    
    getLogin: (req,res) =>{
        const fmsq= req.flash();
        console.log('login',fmsq);
        res.render('login.ejs', {feedback: fmsq.message});
    },
    // loginProcess: async (req, res) => {
    //     const user = req.body;
    //     const authData = await loginModel.loginProcess(user);
    //     const posts = await homeModel.home();
    //     if(authData != null){
    //         req.session.is_logined = true;
    //         req.session.nickname = authData.nickname;
    //         await req.session.save(() => {
    //             res.redirect('/');
    //         });
    //     } else{
    //         res.redirect('/login');
    //     }   
    // },
    logoutProcess: async (req, res) => {
        req.logout(function(err) {
            if (err) { return next(err); }
            res.redirect('/');
        });
    },

}