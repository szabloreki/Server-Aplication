	const express = require('express');
	const bodyParser = require('body-parser');
	const path = require('path');
	const expressValidator = require('express-validator')
	const mongojs = require('mongojs');
	const mongoose = require('mongoose');
	const mongo = require('mongodb');
	const exphbs = require('express-handlebars');
	const session = require('express-session');

	var cookieParser = require('cookie-parser');
	var flash = require('connect-flash');
	var passport = require('passport');
	var LocalStrategy = require('passport-local').Strategy;

	let db = mongojs('workers', ['users','login']);
	let app = express();


	let login = require("./routes/login");
	let register = require("./routes/register");
	let postApp = require("./routes/postApp");
	let getApp = require("./routes/getApp");
	let webSites = require("./websites");
	let users = require('./routes/users')



	//app.set('views', path.join(__dirname, 'views'));
	app.engine('handlebars' ,exphbs({defaultLayout: 'layout'}));
	app.set('view engine', 'handlebars');

	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({extended: false}))
	app.use(cookieParser());

	// Express Session
	app.use(session({
	    secret: 'secret',
	    saveUninitialized: true,
	    resave: true
	}));

	app.use(passport.initialize());
	app.use(passport.session());

	app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

app.use(flash());

app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});


	//connect-flash

		//app.use('/',routes);
		app.use('/', login);
		app.use('/', register);
		app.use('/', postApp);
		app.use('/', getApp);
		app.use('/' ,webSites);
		app.use('/' ,users);


	app.listen(3000, function() {
			console.log('Server Started on Port 3000...')
		// body...
	});
