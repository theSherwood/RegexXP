const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const bodyParser = require("body-parser");

// Load Models
require("./models/User");

// Load Routes
// const auth = require("./routes/auth");
// const index = require('./routes/index');
// const puzzle = require('./routes/puzzle');
const auth = require("./routes/api/auth");
// const index = require("./routes/index");
// const puzzle = require("./routes/api/challenges");

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

// Use Routes
// app.use("/", index);
// app.use("/auth", auth);
// app.use("/puzzle", puzzle);
app.use("/api/auth", auth);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
