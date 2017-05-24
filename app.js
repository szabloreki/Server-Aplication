	const express = require('express');
	const bodyParser = require('body-parser');
	const path = require('path');
	const expressValidator = require('express-validator')
	const mongojs = require('mongojs');
	const exphbs = require('express-handlebars');
	let db = mongojs('workers', ['users','login']);
	let app = express();

	let login = require("./routes/login");
	let register = require("./routes/register");
	let postApp = require("./routes/postApp");
	let getApp = require("./routes/getApp");
	let webSites = require("./websites")
	
	//app.set('views', path.join(__dirname, 'views'));
	app.engine('handlebars' ,exphbs({defaultLayout: 'layout'}));
	app.set('view engine', 'handlebars');

	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({extended: false}))

		app.use('/',routes);
		app.use('/', login);
		app.use('/', register);
		app.use('/', postApp);
		app.use('/', getApp);
		app.use('/' ,webSites)

	app.listen(3000, function() {
			console.log('Server Started on Port 3000...')
		// body...
	});