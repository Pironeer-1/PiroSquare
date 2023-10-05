const express = require("express");
const app = express();

// 포트 번호 설정
require("dotenv").config();
app.set("port", process.env.SERVER_PORT || 8000);
// app.set(1,2) 1을 2로 설정

const cors = require("cors");
const corsOptions = {
  origin: "http://localhost:3000",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};

app.use(cors(corsOptions));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // 클라이언트에서 서버로 리소스 허용
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Views
app.set("view engine", "ejs");
app.set("views", "views");

// express ejs layout (템플릿 확장)
var expressLayouts = require("express-ejs-layouts");
app.use(expressLayouts);
app.set("layout", "index.ejs");
app.set("layout extractStyles", true);
app.use(express.static("public"));
//login_process 미들웨어

const session = require('express-session');
const FileStore = require('session-file-store')(session);
app.use(session({
    secret: 'asadlfkj!@#!@#dfgasdg',
    resave: false,
    saveUninitialized: true,
    store:new FileStore(),
}));
const cookieParser = require("cookie-parser");
app.use(cookieParser());
//Controllers
const passportController = require("./controllers/passportController.js")(app);
const homeController = require("./controllers/homeController.js");
// const loginController = require("./controllers/loginController.js");
//const postController = require('./controllers/postController.js');

//Router
const postRouter = require("./routers/postRouter.js");
const questionRouter = require("./routers/questionRouter.js");
const informRouter = require("./routers/informRouter.js");
const recruitRouter = require("./routers/recruitRouter.js");
const mypageRouter = require("./routers/mypageRouter.js");
const loginRouter = require("./routers/loginRouter.js");
const commentRouter = require("./routers/commentRouter.js");
const likeRouter = require("./routers/likeRouter.js");
const apiRouter = require("./routers/apiRouter.js");

// 유저 검증 미들웨어 함수
const userAuthenticationMiddleware = async (req, res, next) => {
  const user = await req.user;
  if (user && user.is_active) {
    // 로그인된 경우 다음 미들웨어로 이동
    console.log('허용');
    next();
  } else {
    // 로그인되지 않은 경우 오류 처리 미들웨어로 이동
    const error = new Error('Unauthorized');
    error.status = 401;
    next(error);
  }
};

// 로그인 검증 로직이 필요없는 URL
app.get("/", homeController.getPosts);
app.use("/auth", loginRouter);
app.use("/api", apiRouter);

// ** 맨처음 로그인하면 추가정보를 입력하기 위해 mypage로 이동하는데 이러한 추가정보를
// 받는 로직을 따로 분리해서 유저 검증 미들웨어 위에 지정해야함

// 아래의 모든 URL에 대해 유저 검증 미들웨어를 실행
//app.use(userAuthenticationMiddleware);

app.use("/post", postRouter);
app.use("/question", questionRouter);
app.use("/inform", informRouter);
app.use("/recruit", recruitRouter);
app.use("/mypage", mypageRouter);
app.use("/comment", commentRouter);
app.use("/like", likeRouter);
app.use("/user", express.static("uploads/profile"));
app.use("/post/image", express.static("uploads/post"));
app.use("/comment/image", express.static("uploads/comment"));

// 오류 처리 미들웨어
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  if(err.message){
    res.send('승인된 유저만 이용할 수 있습니다.\nerror : '+err.message);
  }else{
    res.send('Internal Server Error');
  }
});

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기 중");
});