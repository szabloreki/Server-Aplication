	const express = require('express');
	const bodyParser = require('body-parser');
	const path = require('path');
	const bson = require('bson');
	const mongo = require('mongodb');
	const session = require('express-session');
	const exphbs = require('express-handlebars');
	const mongojs = require('mongojs')
	var cookieParser = require('cookie-parser');
	let app = express();
	//files
	//let schema = require('./Schema/User.js');
	//Systems
	let systemLogin = require('./system.js')
	//let login = require("./routes/login");
	//let register = require("./routes/register");
	//let postApp = require("./routes/postApp");
	//let getApp = require("./routes/getApp");
	//let webSites = require("./websites");
	//let users = require('./routes/users')
	//app.set('views', path.join(__dirname, 'views'));
	//app.engine('handlebars');
	app.engine('handlebars' ,exphbs({defaultLayout: 'layout'}));
	app.set('view engine', 'handlebars');
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({extended: false}))
	app.use(cookieParser());
	app.use(session({secret: "345b234n23b234b5", resave:false, saveUninitialized:true}));
	// Express Session
	//app.use(session({
	  //  secret: 'secret',
	    //saveUninitialized: true,
	    //resave: true
	//}));

//	app.use(passport.initialize());
//	app.use(passport.session());

/*	app.use(expressValidator({
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
*/
	//connect-flash
		//app.use('/',routes);
		//app.use('/', login);
		//app.use('/', register);
		//app.use('/', postApp);
		//app.use('/', getApp);
		//app.use('/' ,webSites);
		app.use('/', systemLogin);
		//app.use('/users' ,users);

	app.listen(8080, function() {
			console.log('Server Started on Port 8080...')
		// body...
	});

	//Credits
	//bootstrap-form / ten film/
