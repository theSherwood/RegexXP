const express = require('express');
const router = express.Router();
const passport = require('passport');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Load User Model
const User = mongoose.model('users');

// Local Strategy
// Login
router.get('/', (req, res) => {
  res.render('auth/login');
});
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/auth',
    // failureFlash: true
  })(req, res, next);
});
// Signup
router.get('/signup', (req, res) => {
  res.render('auth/signup');
});
router.post('/signup', (req, res) => {
  let errors = [];
  console.log(req.body);

  if (req.body.password !== req.body.password2) {
    errors.push({ text: 'Passwords do not match' });
  }

  if (req.body.password.length < 4) {
    errors.push({ text: 'Password must be at least 4 characters' });
  }

  if (errors.length > 0) {
    res.render('auth/signup', {
      errors: errors,
      displayName: req.body.display-name,
      email: req.body.email,
      password: req.body.password,
      password2: req.body.password2
    })
  } else {
    User.findOne({ email: req.body.email })
      .then(user => {
        if (user) {
          // req.flash('error_msg', 'Email already registered');
          res.redirect('/auth/signup');
        } else {
          const newUser = new User({
            displayName: req.body['display-name'],
            email: req.body.email,
            password: req.body.password
          });

          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;
              newUser.password = hash;
              newUser.save()
                .then(user => {
                  // req.flash('success_msg', 'You are now registered and can log in');
                  res.redirect('/auth');
                })
                .catch(err => {
                  console.log(err);
                  return;
                });
            });
          });
        }
      });
  }
})

// Google OAuth
router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));
router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/auth' }),
  (req, res) => {
    res.redirect('/dashboard');
  });

// Github OAuth
router.get('/github',
  passport.authenticate('github', { scope: ['user:email'] }));
router.get('/github/callback',
  passport.authenticate('github', { failureRedirect: '/auth' }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect('/dashboard');
  });

router.get('/verify', (req, res) => {
  if (req.user) {
    console.log(req.user);
  } else {
    console.log('Not Auth');
  }
});

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;