const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');

const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');

// const configDB = require('./config/database.js');
// Configuration

// mongoose.connect(configDB.url); //Connection to our database

require('./config/passport')(passport); //pass passport for configuration

// Set up our express application
app.use(morgan('dev')); //log the request to the console
app.use(cookieParser()); //read cookies(need for auth)
app.use(bodyParser()); // get info from html

app.set('view engine', 'ejs');

// required for passport
app.use(session({secret : 'blablabla'})) // session secret
app.use(passport.initialize());
app.use(passport.session()); //persistent login sessions
app.use(flash()); //use connect-flash for flash messages

//routes
require('./app/routes.js')(app, passport); // load our routes

//launch
app.listen(port);
console.log('magic happens on :' + port);
