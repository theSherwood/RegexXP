const express = require("express");
const router = express.Router();
// const jwt = require('jsonwebtoken')
const passport = require("passport");

// Load models
const Challenge = require("../../models/Challenge");
const Comment = require("../../models/Comment");
const Solution = require("../../models/Solution");

// @route   GET api/posts/test
// @desc    Tests posts route
// @access  Public
router.get("/test", (req, res) => {
  res.json({
    msg: "Challenges Route Works"
  });
});

// @route   POST api/challenges
// @desc    Create challenge
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    const newChallenge = new Challenge({
      user: req.user.id,
      title: req.body.title,
      description: req.body.description,
      text: req.body.text,
      highlight: req.body.highlight
    });

    newChallenge
      .save()
      .then(challenge => res.json(challenge))
      .catch(err => res.json(err));
  }
);

module.exports = router;
