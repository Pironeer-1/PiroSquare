module.exports = function (app) {
    const passport = require('passport');
    const LocalStrategy = require('passport-local').Strategy;
    const loginModel = require("../models/loginModel");
    
    
    app.use(passport.initialize());
    app.use(passport.session());
    
    passport.serializeUser(function(user, done) {
        console.log('ser', user);
        done(null, user.ID);
    });
    passport.deserializeUser(function(id, done) {
        console.log('des', id);
        const authData = loginModel.getUser(id);
        done(null, authData);
    });
    
    passport.use(new LocalStrategy(
        {
            usernameField: 'id',
            passwordField: 'pwd'
        },
        async function(username, password, done) {
            console.log('LocalStartegy', username, password);
            const authData = await loginModel.loginProcess(username, password);
            if (authData === null) {
                console.log(4);
                return done(null, false, {
                    message: 'Incorrect username or password.'
                });
            }
            if(username === authData.ID) {
                console.log(1);
                if(password === authData.password) {
                    console.log(2);
                    return done(null, authData, {
                        message: 'Welcome.'
                    });
                } else {
                    console.log(3);
                    return done(null, false, {
                        message: 'Incorrect password.'
                    });
                }
            } else {
                console.log(4);
                return done(null, false, {
                    message: 'Incorrect username.'
                });
            }
        }
    ));

    return passport;
}

