const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const passport = require("passport");
const fetch = require("node-fetch");

// Load User Model
const User = require("../../models/User");

// Google OAuth
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"]
  }),
  (req, res) => {
    console.log("here's the get!!!!");
  }
);
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/auth" }),
  (req, res) => {
    res.redirect("/dashboard");

    console.log(req, res);

    // jwt.sign(
    //   payload,
    //   process.env.JWT_SECRET,
    //   { expiresIn: 36000 },
    //   (err, token) => {
    //     res.json({
    //       success: true,
    //       token: "Bearer " + token
    //     });
    //   }
    // );
  }
);

// Github OAuth
router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);
router.get(
  "/github/callback",
  passport.authenticate("github", { failureRedirect: "/auth" }),
  function (req, res) {
    // res.redirect('/')

    const { githubId, handle, email } = req.user;
    const payload = {
      githubId,
      handle,
      email
    }
    console.log('jwt signing')
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: 36000 },
      (err, token) => {
        res.redirect('/jwt/' + token)
        //   success: true,
        //   token: "Bearer " + token
        // });
      }
    );
  }
);

// router.get("/github/callback", (req, res, next) => {
//   const { code } = req.query;

//   console.log("code", code);

//   fetch(
//     // "https://github.com/login/oauth/access_token",

//     `https://github.com/login/oauth/access_token?client_id=1e3167ec8e9419c0f467&client_secret=${
//     process.env.GITHUB_CLIENT_SECRET
//     }&code=${code}`,
//     {
//       method: "POST",
//       headers: {
//         // "Content-Type": "application/json",
//         'Accept': "application/json"
//       }
//       // body: JSON.stringify({
//       //   client_id: "1e3167ec8e9419c0f467",
//       //   client_secret: process.env.GITHUB_CLIENT_SECRET,
//       //   code
//       // })
//     }
//   ).then(result => {
//     const data = result;
//     console.log(data);

//     res.send(data);
//   });
// });

module.exports = router;
