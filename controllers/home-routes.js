const router = require('express').Router();
const {Blog,User,Comment } = require('../models');

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
        // loggedIn: req.session.loggedIn,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

  router.get('/blog/:id', async (req, res) => {
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

//Get all blogs by user ID
router.get('/dashboard', async (req, res) => {
  try {
    const blogData = await Blog.findAll({
      include: [{model: User, where: {id: 1}}] //--->TODO: HOW DO i TIE THIS TO THE USER WHO IS CURRENTLY SIGNED IN???
    });

    //error handling if there is no user with that id
    if (!blogData){
      res.status(404).json({message: 'No blog found for that user'});
      return;
    }
    const blogs = blogData.map((blog) =>
    blog.get({ plain: true })
    );
    res.render('dashboard', {
      blogs,
      // loggedIn: req.session.loggedIn,
    });
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



module.exports = router;
