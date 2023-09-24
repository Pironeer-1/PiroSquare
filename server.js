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
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
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

const homeController = require('./controllers/homeController.js');
app.get('/', homeController.home);

// Routes 설정(현재 없음)
// 아래 코드는 예시
// const postRouter = require('./routers/postRouter.js');
// app.use('/post', postRouter);

app.listen(app.get('port'), ()=>{
    console.log(app.get('port'), '번 포트에서 대기 중')
});