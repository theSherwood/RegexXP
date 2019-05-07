const GoogleStrategy = require("passport-google-oauth20").Strategy;
// const LocalStrategy = require('passport-local').Strategy;
const GitHubStrategy = require("passport-github2").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
// const bcrypt = require('bcryptjs');

// Load user model
const User = mongoose.model("users");

const options = {};
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = process.env.JWT_SECRET;

module.exports = passport => {
  passport.use(
    new JwtStrategy(options, (jwt_payload, done) => {
      User.findById(jwt_payload.id)
        .then(user => {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch(err => console.log(err));
    })
  );

  // module.exports = function (passport) {
  //   passport.use(new LocalStrategy({ usernameField: 'email' }, (req, email, password, done) => {
  //     // Match user
  //     User.findOne({
  //       email: email
  //     }).then(user => {
  //       if (!user) {
  //         return done(null, false, { message: 'No User Found' });
  //       }
  //       // Match password
  //       bcrypt.compare(password, user.password, (err, isMatch) => {
  //         if (err) throw err;
  //         if (isMatch) {
  //           return done(null, user);
  //         } else {
  //           return done(null, false, { message: 'Password Incorrect' });
  //         }
  //       })
  //     })

  //   // const errors = {};

  //   // const email = req.body.email;
  //   // const password = req.body.password;

  //   // // Find user
  //   // User.findOne({ email }).then(user => {
  //   //   if (!user) {
  //   //     errors.email =
  //   //       "That email/password combination doesn't match our records";
  //   //     return res.status(404).json(errors);
  //   //   }
  //   //   // Check password
  //   //   bcrypt.compare(password, user.password).then(isMatch => {
  //   //     if (isMatch) {
  //   //       const payload = {
  //   //         id: user.id,
  //   //         email: user.email,
  //   //         displayName: user.displayName
  //   //       };
  //   //       return res.json(payload);
  //   //     } else {
  //   //       errors.email =
  //   //         "That email/password combination doesn't match our records";
  //   //       return res.status(404).json(errors);
  //   //     }
  //   //   });
  //   // });

  //   }));

  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback",
        proxy: true
      },
      (accessToken, refreshToken, profile, done) => {
        const newUser = {
          googleID: profile.id,
          handle: profile.name.givenName || profile.name.familyName,
          email: profile.emails[0].value,
          image: profile.photos[0].value
        };

        // Check for existing user
        User.findOne({
          googleID: profile.id
        }).then(user => {
          if (user) {
            // Return user
            done(null, user);
          } else {
            // Create user
            new User(newUser).save().then(user => done(null, user));
          }
        });
      }
    )
  );

  passport.use(
    new GitHubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: "/auth/github/callback",
        proxy: true
      },
      (accessToken, refreshToken, profile, done) => {
        const newUser = {
          githubId: profile.id,
          handle: profile.displayName || profile.username,
          email: profile._json.email,
          image: profile.photos[0].value
        };
        User.findOne({
          githubId: profile.id
        }).then(user => {
          if (user) {
            // Return user
            done(null, user);
          } else {
            // Create user
            new User(newUser).save().then(user => done(null, user));
          }
        });
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id).then(user => done(null, user.id));
  });
};
