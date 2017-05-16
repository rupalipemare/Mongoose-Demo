var express = require('express'),
    session = require('express-session'),
    cookie = require('cookie-parser'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    passport = require('./config/passport.js'),
    app = express();

var routes = require('./routes/index');
app.use(express.static(__dirname + '/public'));
app.engine('ejs', require('express-ejs-extend'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(cookie());
app.use(session({
    secret: 'Site visit',
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false, maxAge : 6000000 }
}));
passport(app);

// connect to mongodb database
mongoose.connect('mongodb://localhost/mongoosedemo');

// call the routes
app.use(routes);

// call middleware after all routes
app.use(function (request, response) {
   response.send("Oops Nothing found");
});
// error handler middleware
app.use(function (err,request, response, next) {
    response.send("Error Occured : " + err);
});
// start up server at the port
app.listen(3000);
