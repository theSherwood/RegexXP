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

// @route   GET api/challenges
// @desc    Get challenges
// @access  Public
router.get("/", (req, res) => {
  Challenge.find()
    .sort(req.body.sortBy || { date: -1 })
    .then(challenges => res.json(challenges))
    .catch(err => res.status(404).json(err));
});

// @route   GET api/challenges/:id
// @desc    Get a particular challenge by id
// @access  Public
router.get("/:id", (req, res) => {
  // Show solutions (sort by length: -1) and comments
  Challenge.findById(req.params.id)
    .then(challenge => {
      if (challenge) {
        return res.json(challenge);
      }
      return res.status(404).json({ notFound: "Challenge not found" });
    })
    .catch(err => res.status(404).json(err));
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

// @route   DELETE api/challenges/:id
// @desc    Delete challenge
// @access  Private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Challenge.findById(req.params.id)
      .then(challenge => {
        // if user is creator/owner of challenge
        if (req.user.id !== challenge.user.toString()) {
          return res.status(401).json({ unauthorized: "Unauthorized" });
        }
        challenge.delete().then(() => res.json({ success: true }));
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   POST api/challenges/:id/add-solution
// @desc    Post solution to challenge
// @access  Private
router.post(
  "/:id/add-solution",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Challenge.findById(req.params.id).then(challenge => {
      if (challenge) {
        // Create solution
        new Solution({
          challenge: challenge._id,
          handle: req.user.handle,
          regex: req.body.regex,
          length: req.body.regex.length,
          description: req.body.description,
          user: req.user.id
        })
          .save()
          .then(solution => {
            challenge.solutions.push(solution._id);

            // Save
            challenge.save().then(challenge => res.json(challenge));
          })
          .catch(err => res.status(404).json(err));
      }
    });
  }
);

// @route   GET api/challenges/:id/solutions
// @desc    Get all solutions to a challenge
// @access  Private
router.get(
  "/:id/solutions",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Challenge.findById(req.params.id).then(challenge => {
      if (challenge) {
        Solution.find({ challenge: challenge._id.toString() })
          .sort(req.body.sortBy || { length: 1, date: 1 })
          .then(solutions => res.json(solutions))
          .catch(err => res.status(404).json(err));
      }
    });
  }
);

// @route   Delete api/challenges/solutions/:solution_id
// @desc    Delete a solution from a challenge
// @access  Private
router.delete(
  "/solutions/:solution_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Solution.findById(req.params.solution_id)
      .then(solution => {
        if (solution.user.toString() !== req.user.id) {
          return res.status(401).json({ unauthorized: "Unauthorized" });
        }
        solution.delete().then(() => res.json({ success: true }));
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   POST api/challenges/:id/add-comment
// @desc    Add comment to a challenge
// @access  Private
router.post(
  "/:id/add-comment",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Challenge.findById(req.params.id)
      .then(challenge => {
        if (challenge) {
          // Create solution
          new Comment({
            challenge: challenge._id,
            handle: req.user.handle,
            text: req.body.text,
            user: req.user.id
          })
            .save()
            .then(comment => res.json(comment))
            .catch(err => res.status(404).json(err));
        }
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   GET api/challenges/:id/comments
// @desc    Get all comments to a challenge
// @access  Private
router.get(
  "/:id/comments",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Challenge.findById(req.params.id).then(challenge => {
      if (challenge) {
        Comment.find({ challenge: challenge._id.toString() })
          .sort(req.body.sortBy || { date: -1 })
          .then(comments => res.json(comments))
          .catch(err => res.status(404).json(err));
      }
    });
  }
);

// @route   POST api/challenges/solutions/:solution_id/add-comment
// @desc    Add comment to a challenge
// @access  Private
router.post(
  "/solutions/:solution_id/add-comment",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Solution.findById(req.params.id)
      .then(solution => {
        if (solution) {
          // Create solution
          new Comment({
            solution: solution._id,
            handle: req.user.handle,
            text: req.body.text,
            user: req.user.id
          })
            .save()
            .then(comment => res.json(comment))
            .catch(err => res.status(404).json(err));
        }
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   GET api/challenges/solutions/:solution_id/comments
// @desc    Get all comments to a challenge
// @access  Private
router.get(
  "/solutions/:solution_id/comments",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Solution.findById(req.params.id).then(solution => {
      if (solution) {
        Comment.find({ solution: solution._id.toString() })
          .sort(req.body.sortBy || { date: -1 })
          .then(comments => res.json(comments))
          .catch(err => res.status(404).json(err));
      }
    });
  }
);

// @route   Delete api/challenges/comments/:comment_id
// @desc    Delete a comment from a challenge
// @access  Private
router.delete(
  "/comments/:comment_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Comment.findById(req.params.comment_id)
      .then(comment => {
        if (comment.user.toString() !== req.user.id) {
          return res.status(401).json({ unauthorized: "Unauthorized" });
        }
        comment.delete().then(() => res.json({ success: true }));
      })
      .catch(err => res.status(404).json(err));
  }
);

module.exports = router;
