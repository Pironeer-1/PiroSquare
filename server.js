const express = require('express');
const app = express();
const port = 3000;

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('view engine', 'ejs');
app.set('views', 'views');
app.set('port', process.env.PORT || port);

app.listen(app.get('port'), ()=>{
    console.log(app.get('port'), '번 포트에서 대기 중')
});

//Controllers
const homeController = require('./controllers/homeController.js');
const postController = require('./controllers/postController.js');

app.get('/', homeController.getPosts);
app.get('/post/detail/:post_id', postController.detailPost);
app.get('/post/create', postController.createPost);
app.post('/post/create', postController.createNewPost);


