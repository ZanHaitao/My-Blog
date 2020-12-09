const User = require('./table/User');
const Article = require('./table/Article');
const Comment = require('./table/Comment');
const Reply = require('./table/Reply');
const ArticleType = require('./table/ArticleType');
const Label = require('./table/Label');

/**
 * 文章与用户关系
 */
User.hasMany(Article);
Article.belongsTo(User)

/**
 * 文章与文章类型关系
 */
ArticleType.hasMany(Article);
Article.belongsTo(ArticleType);

/**
 * 文章与标签关系
 */
Label.hasMany(Article);
Article.belongsTo(Label);

/**
 * 文章与评论关系
 */
Article.hasMany(Comment);
Comment.belongsTo(Article);

/**
 * 评论与回复关系
 */
Comment.hasMany(Reply);
Reply.belongsTo(Comment);

