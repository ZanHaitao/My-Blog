require('./table/User');
require('./table/Article');
require('./table/Comment');
require('./table/Reply');
require('./table/ArticleType');
require('./table/Label');
require('./table/Page');
require('./table/Config');
require('./table/EveryDay');

const sequelize = require('./db');

sequelize.sync({
    alter: true
}).then(() => {
    console.log("所有模型同步成功");
})