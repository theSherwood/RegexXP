const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const exphbs = require('express-handlebars');

// Load Models
require('./models/User');

// Load Routes
const auth = require('./routes/auth');

// Config Environment Vars
require('dotenv').config();

// Passport Config
require('./config/passport')(passport);

// Mongoose Connect
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

const app = express();

app.get('/', (req, res) => {
  res.send('Index');
});

// Express session Middleware
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
}));

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Set Global Vars
app.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
});

// Express-handlebars Middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Use Routes
app.use('/auth', auth);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`)
});