const router = require('express').Router();
const {Blog,User,Comment } = require('../models');
const {withAuth} = require('../utils/auth');

//Get all Blog Posts
router.get('/', async (req, res) => {
    try {
      const blogData = await Blog.findAll({
        include: [{model: User}],
      });
  
      const blogs = blogData.map((blog) =>
      blog.get({ plain: true })
      );
      res.render('homepage', {
        blogs,
        loggedIn: req.session.loggedIn,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

  router.get('/blog/:id', withAuth, async (req, res) => {
    // find one blog by its `id` value
    // be sure to include its associated comments
    try {
      const blogData = await Blog.findByPk(req.params.id, {
        include: [{model: User},{model:Comment}],
      });
      const blogs = blogData.get({ plain: true });
      res.render('blog',blogs);
    } catch (err) {
      res.status(500).json(err);
    }
  });

//Get all blogs by user ID if signed in
router.get('/dashboard', withAuth, async (req, res) => {
  try {
      const blogData = await Blog.findAll({
        
        include: [{ model: User, 
          where: {id: req.session.user_id},
          attributes: { exclude: ['password'] }, 
        }],
      })
      const blogs = blogData.map((blog) =>
      blog.get({ plain: true })
      );
      console.log(blogs);
      res.render('dashboard', {
        blogs,
        loggedIn: true
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

router.get('/newpost', withAuth, async (req, res) => {
  try {
    
    res.render('new-post');
  } catch (err) {
    res.status(500).json(err);
  }
});



router.get('/login', async (req, res) => {
  try {
    
    res.render('login');
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/signup', async (req, res) => {
  try {
    
    res.render('signup');
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;
