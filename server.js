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
app.use('/user', express.static('uploads/profile'));
//login_process 미들웨어
const session = require('express-session');
const FileStore = require('session-file-store')(session);
app.use(session({
    secret: 'asadlfkj!@#!@#dfgasdg',
    resave: false,
    saveUninitialized: true,
    store:new FileStore(),
    cookie: {
        maxAge: 1000 * 60 * 60 * 24, // 세션 유지 기간 (1일)
    },
}));

const cookieParser = require('cookie-parser');
app.use(cookieParser());
//Controllers
const passportController = require('./controllers/passportController.js')(app);
const homeController = require('./controllers/homeController.js');
const loginController = require('./controllers/loginController.js');
//const postController = require('./controllers/postController.js');

//Router
const postRouter = require('./routers/postRouter.js');
const questionRouter = require('./routers/questionRouter.js');
const informRouter = require('./routers/informRouter.js');
const recruitRouter = require('./routers/recruitRouter.js');
const mypageRouter = require('./routers/mypageRouter.js');
const loginRouter = require('./routers/loginRouter.js');
const commentRouter = require('./routers/commentRouter.js');
const likeRouter = require('./routers/likeRouter.js');

app.use('/post', postRouter);
app.use('/question', questionRouter);
app.use('/inform', informRouter);
app.use('/recruit', recruitRouter);
app.use('/mypage', mypageRouter);
app.use('/auth', loginRouter);
app.use('/comment', commentRouter);
app.use('/like', likeRouter);

app.get('/', homeController.getPosts);

app.listen(app.get('port'), ()=>{
    console.log(app.get('port'), '번 포트에서 대기 중');
});

