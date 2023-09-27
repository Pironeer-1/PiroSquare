//loginController.js
const passport = require('passport');

module.exports = {
    logoutProcess: async (req, res) => {
        await req.logout(function(err) {
            if (err) { return next(err); }
            res.redirect('/');
        });
    },
}