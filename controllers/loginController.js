//loginController.js
const passport = require('passport');

module.exports = {
    
    getLogin: async (req,res) =>{
        console.log('hi')
        const fmsq= await req.flash();
        console.log('login',fmsq);
        res.render('login.ejs', {feedback: fmsq.message});
    },
    logoutProcess: async (req, res) => {
        await req.logout(function(err) {
            if (err) { return next(err); }
            res.redirect('/');
        });
    },
    loginProcess: async (req, res, next) => {
        passport.authenticate('local', async (err, user, info) => {
            if (err) {
                return next(err);
            }
            if (!user) {
                await req.flash('message', info.message);
                return await req.session.save(() => {
                    res.redirect('/login');
                });
            }
            req.logIn(user, async (err) => {
                if (err) {
                    return next(err);
                }
                return await req.session.save(() => {
                    res.redirect('/');
                });
            });
        })(req, res, next);
    },
}