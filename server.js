const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const bodyParser = require("body-parser");

// Load Models
require("./models/User");

// Load Routes
const auth = require("./routes/api/auth");
const challenges = require("./routes/api/challenges");
const oauth = require("./routes/oauth/auth");

// Config Environment Vars
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

// Mongoose Connect
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true
  })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

const app = express();

// Express session Middleware
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false
  })
);


// Body-parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Passport Config
require("./config/passport")(passport);

// Cors Middleware
// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

// Use Routes
app.use("/api/auth", auth);
app.use("/api/challenges", challenges);
app.use("/auth", oauth);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
