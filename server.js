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
app.use(session({
    secret: 'asadlfkj!@#!@#dfgasdg',
    resave: false,
    saveUninitialized: true,
    store:new FileStore()
}));


//Controllers

const passportController = require('./controllers/passportController.js')(app);
const loginController = require('./controllers/loginController.js');
const homeController = require('./controllers/homeController.js');
const postController = require('./controllers/postController.js');

//Router
const postRouter = require('./routers/postRouter.js');
const questionRouter = require('./routers/questionRouter.js');
const informRouter = require('./routers/informRouter.js');
const recruitRouter = require('./routers/recruitRouter.js');

app.use('/post', postRouter);
app.use('/question', questionRouter);
app.use('/inform', informRouter);
app.use('/recruit', recruitRouter);

app.get('/', homeController.getPosts);
app.get('/logout', loginController.logoutProcess);


app.listen(app.get('port'), ()=>{
    console.log(app.get('port'), '번 포트에서 대기 중');
});
