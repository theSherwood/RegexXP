const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Index
router.get('/', (req, res) => {
  res.render('index/index');
});

// Dashboard
router.get('/dashboard', (req, res) => {
  res.render('index/dashboard');
});

module.exports = router;