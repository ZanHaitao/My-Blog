const express = require('express');
const path = require('path');
const app = express();
const history = require('connect-history-api-fallback');
const cors = require('cors');
const cookieParse = require('cookie-parser');

//端口监听
const port = 80;
app.listen(port, () => {
    console.log("服务器启动成功");
});

//处理单页面中间件
app.use(history());

//处理静态资源中间件
const statcRoot = path.resolve(__dirname, '../public');
app.use(express.static(statcRoot));

//处理cors跨域
app.use(cors());

//处理cookie
app.use(cookieParse());

// jwt 登录验证
app.use(require('./middleware/tokenMiddleware'));

// 解析 application/x-www-form-urlencoded 请求体
app.use(express.urlencoded({
    extended: true
}));

// 解析 application/json 请求体
app.use(express.json());

// api处理
app.use('/api/aritcle',require('./api/AritcleRouter'));
app.use('/api/aritcleType',require('./api/AritcleTypeRouter'));
app.use('/api/comment',require('./api/CommentRouter'));
app.use('/api/config',require('./api/ConfigRouter'));
app.use('/api/everyDay',require('./api/EveryDayRouter'));
app.use('/api/label',require('./api/LabelRouter'));
app.use('/api/page',require('./api/PageRouter'));
app.use('/api/reply',require('./api/ReplyRouter'));
app.use('/api/user',require('./api/UserRouter'));

// 处理报错中间件
app.use(require('./middleware/errorMiddleware'));