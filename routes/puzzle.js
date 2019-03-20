const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const sanitizeHtml = require('sanitize-html');



// Index
router.get('/', (req, res) => {
  res.render('puzzle/index');
});

// Create Puzzle Page
router.get('/create', (req, res) => {
  res.render('puzzle/create');
});

// Process Form Create Puzzle
router.post('/create', (req, res) => {
  // const puzzleText = sanitizeHtml(req.body.puzzleText, {
  //   allowedTags: [],
  //   allowedAttributes: {}
  // });
  const puzzleText = sanitizeHtml(req.body.puzzleText);
  console.log(puzzleText);
  res.render('puzzle/create');
})

module.exports = router;