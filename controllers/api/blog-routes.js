const router = require('express').Router();
const { Blog,Comment, User } = require('../../models');
const {withAuth} = require('../../utils/auth');

// api/blogs

//Get blog by ID
router.get('/:id', async (req, res) => {
  // find one blog by its `id` value
  // be sure to include its associated comments
  try {
    const blogData = await Blog.findByPk(req.params.id, {
      include: [{model: Comment}],
    });

    //error handling if there is no entry with that id
    if (!blogData){
      res.status(404).json({message: 'No blog found with that id'});
      return;
    }

    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Get all blogs by user ID
router.get('/user/:id', withAuth,async (req, res) => {
  try {
    const blogData = await Blog.findAll({
      where: {
        User_ID: req.params.id
      }
    });

    //error handling if there is no user with that id
    if (!blogData){
      res.status(404).json({message: 'No blog found for that user'});
      return;
    }

    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
  }
});


//Create new blog post
router.post('/', withAuth,async (req, res) => {
  try {
      const blogData = await Blog.create({
          Title: req.body.title,
          Content: req.body.content,
          User_ID: req.session.user_id,
      });
      res.status(200).json(blogData);
  } catch (err) {
      res.status(400).json(err);
  }
});

// update a blog by its `id` value
router.put('/:id', withAuth,async (req, res) => {
  try {
    const blogUpdate = await  Blog.update(
      {Title: req.body.title,
      Content: req.body.content},
      {where: {id: req.params.id}}
      )
      res.status(200).json(blogUpdate);
  } catch (err) {
    res.status(409).json(err);
  }
});


// delete a blog by its `id` value
router.delete('/:id', withAuth,async (req, res) => {
  try {
    const blog = await Blog.findOne({
      where: {id: req.params.id}
    })
    await blog.destroy();
        //error handling if there's no product with that id
    if (!blog) {
      res.status(404).json({ message: 'No blog with this id!' });
      return;
    }
    res.status(200).json(blog);
  } catch (err) {
    res.status(500).json(err);
    console.log(err)
  }
});

module.exports = router;