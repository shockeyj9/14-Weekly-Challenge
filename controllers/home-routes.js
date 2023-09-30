const router = require('express').Router();
const {Blog,User } = require('../models');

//Get all Blog Posts
router.get('/', async (req, res) => {
    try {
      const blogData = await Blog.findAll({
      });
  
    //   const galleries = dbGalleryData.map((gallery) =>
    //     gallery.get({ plain: true })
    //   );
    //   res.render('homepage', {
    //     galleries,
    //     loggedIn: req.session.loggedIn,
    //   });
    res.status(200).json(blogData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });




module.exports = router;
