const User = require('./User');
const Blog = require('./Blog');
const Comment = require('./Comment');


// Blog belongsTo User
Blog.belongsTo(User,{
  foreignKey: 'user_id'
});

// Users have many Blogs
User.hasMany(Blog,{
  foreignKey: 'user_id',
  onDelete: "CASCADE"
});

// Comment belongsTo Blog
Comment.belongsTo(Blog,{
    foreignKey: 'blog_id'
  });
// Comment belongsTo User
Comment.belongsTo(User,{
    foreignKey: 'user_id'
  });

// Blogs have many Comments
Blog.hasMany(Comment,{
    foreignKey: 'blog_id',
    onDelete: "CASCADE"
});
// Users have many Comments
User.hasMany(Comment,{
foreignKey: 'user_id',
onDelete: "CASCADE"
});


module.exports = {
  User,
  Blog,
  Comment,
};