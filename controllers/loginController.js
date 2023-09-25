//loginController.js
const loginModel = require("../models/loginModel");
const homeModel = require("../models/homeModel");

module.exports = {
    
    getLogin: (req,res) =>{
        res.render('login.ejs');
    },
    loginProcess: async (req, res) => {
        const user = req.body;
        const authData = await loginModel.loginProcess(user);
        const posts = await homeModel.home();
        if(authData != null){
            req.session.is_logined = true;
            req.session.nickname = authData.nickname;
            await req.session.save(() => {
                res.redirect('/');
            });
        } else{
            res.redirect('/login');
        }   
    },
    logoutProcess: async (req, res) => {
        await req.session.destroy();
        res.redirect('/')
    }
}