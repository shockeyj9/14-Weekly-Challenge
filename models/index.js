const User = require('./User');
const Blog = require('./Blog');
const Comment = require('./Comment');


// Blog belongsTo User
Blog.belongsTo(User,{
  foreignKey: 'User_ID'
});

// Users have many Blogs
User.hasMany(Blog,{
  foreignKey: 'User_ID',
  onDelete: "CASCADE"
});

// Blogs have many Comments
Blog.hasMany(Comment,{
    foreignKey: 'Blog_ID',
    onDelete: "CASCADE"
});
// Comment belongsTo Blog
Comment.belongsTo(Blog,{
    foreignKey: 'Blog_ID'
  });
// Comment belongsTo User
// Comment.belongsTo(User,{
//     foreignKey: 'user_id'
//   });

// Users have many Comments
// User.hasMany(Comment,{
// foreignKey: 'user_id',
// onDelete: "CASCADE"
// });


module.exports = {
  User,
  Blog,
  Comment,
};