const express = require('express');
const app = express();

// 포트 번호 설정
require('dotenv').config()
app.set('port', process.env.SERVER_PORT || 8000);
// app.set(1,2) 1을 2로 설정

// client 접근 허용(나중에 주석 해제)
// const cors = require('cors');
// app.use(cors());

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Views
app.set('view engine', 'ejs');
app.set('views', 'views');

// express ejs layout (템플릿 확장)
var expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);
app.set('layout', 'index.ejs');
app.set('layout extractStyles', true);
app.use(express.static('public'));

//login_process 미들웨어
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const flash = require('connect-flash');

app.use(session({
    secret: 'asadlfkj!@#!@#dfgasdg',
    resave: false,
    saveUninitialized: true,
    store:new FileStore()
}));

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const loginModel = require("./models/loginModel");


app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

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



//Controllers
const homeController = require('./controllers/homeController.js');
const postController = require('./controllers/postController.js');
const loginController = require('./controllers/loginController.js');

app.get('/', homeController.getPosts);
app.get('/post/detail/:post_id', postController.detailPost);
app.get('/post/create', postController.createPost);
app.get('/login', loginController.getLogin);
// app.post('/login/process', loginController.loginProcess);
app.get('/logout', loginController.logoutProcess);
app.post('/post/create', postController.createNewPost);
app.post('/login/process', function (req, res, next) {
    passport.authenticate('local', function (err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user) {
            req.flash('message', info.message); // 플래시 메시지 저장
            return req.session.save(function () {
                res.redirect('/login');
            });
        }
        req.logIn(user, function (err) {
            if (err) { return next(err); }
            return req.session.save(function () {
                res.redirect('/');
            });
        });
    })(req, res, next);
});




const questionRouter = require('./routers/questionRouter.js');

app.use('/question', questionRouter);

app.listen(app.get('port'), ()=>{
    console.log(app.get('port'), '번 포트에서 대기 중')
});

