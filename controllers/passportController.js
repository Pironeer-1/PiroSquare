// passportConfig.js
const passport = require('passport');
const { Strategy: NaverStrategy } = require('passport-naver-v2');
const loginModel = require('../models/loginModel');


module.exports = function (app) {
    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser(function (user, done) {
        done(null, user.ID);
    });

    passport.deserializeUser(function (id, done) {
        const authData = loginModel.getUser(id);
        done(null, authData);
    });

    passport.use(new NaverStrategy(
        {
            clientID: process.env.NAVER_ID,
            clientSecret: process.env.NAVER_SECRET,
            callbackURL: 'login/naver/callback',
        },
        async function (accessToken, refreshToken, profile, done) {
            console.log('Naver Strategy profile:', profile);
            try {
                const exUser = await loginModel.getUser(profile.id);
                if (exUser) {
                    return done(null, exUser);
                } else {
                    const newUser = await loginModel.createUser({
                        name: profile.name,
                        ID: profile.id,
                        nickname: profile.nickname,
                    });
                    return done(null, newUser);
                }
            } catch (error) {
                console.error(error);
                return done(error);
            }
        }
    ));


    app.get('/naver', passport.authenticate('naver', { authType: 'reprompt' }));
    app.get('/login/naver/callback',
        passport.authenticate('naver', { failureRedirect: '/' }),
        (req, res) => {
            res.redirect('/');
        },
    );

    return passport;
};
