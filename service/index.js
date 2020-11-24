require('./models/init');


const { kStringMaxLength } = require('buffer');
const articleService = require('./service/ArticleService');

// articleService.addArticle({
//     title: '11',
//     content: '111',
//     browse: '0',
//     isComment: true,
//     isTop: false,
//     cover: '11',
//     UserId: '1',
//     ArticleTypeId: '1',
//     LabelId: '1'
// }).then(res=>{
//     console.log(res);
// })

// articleService.findByPageArticle().then(res => {
//     console.log(res);
// })

// articleService.addBrowse(5).then(res=>{
//     console.log(res);
// })

// articleService.findByIdArticle(5).then(res => {
//     console.log(res);
// })