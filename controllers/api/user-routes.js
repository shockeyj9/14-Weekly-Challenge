const router = require('express').Router();
const { User } = require('../../models');

// api/users

// CREATE new user
router.post('/', async (req, res) => {
  console.log('sign in route initiated')
    try {
      const dbUserData = await User.create(
        {
        email: req.body.email,
        password: req.body.password,
        }
      );
  
      req.session.save(() => {
         req.session.user_id = dbUserData.id;
         req.session.loggedIn = true;
         res.status(200).json(dbUserData);   
    });
    res.status(200).json(dbUserData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

  // Login
router.post('/login', async (req, res) => {

  try {
    const userData = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    
    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password. Please try again!' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    console.log(validPassword);
    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password. Please try again!' });
      return;
    }

    req.session.save(() => {
      console.log("session save initiated")
      req.session.loggedIn = true;

      res
        .status(200)
        .json({ user: userData, message: 'You are now logged in!' });
    });
    // res
    // .status(200)
    // .json({ user: userData, message: 'You are now logged in!' });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


// Logout
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});


module.exports = router;