const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

// Load Routes
const auth = require('./routes/auth');

// Config Environment Vars
require('dotenv').config();

// Passport Config
require('./config/passport')(passport);

const app = express();

app.get('/', (req, res) => {
  res.send('Index');
});

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Use Routes
app.use('/auth', auth);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`)
});