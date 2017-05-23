	const express = require('express');
	const bodyParser = require('body-parser');
	const path = require('path');
	const expressValidator = require('express-validator')
	const mongojs = require('mongojs');
	const cookieParser = require('cookie-parser');
	const exphbs = require('express-handlebars');
	const flash = require('connect-flash');
	const session = require('express-session');
	const passport = require('passport');
	const LocalStrategy = require('passport-local').Strategy;
	let db = mongojs('workers', ['users','login']);
	let app = express();

	//app.set('views', path.join(__dirname, 'views'));

	app.engine('handlebars' ,exphbs({defaultLayout: 'layout'}));
	app.set('view engine', 'handlebars');

	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({extended: false}))
	app.use(cookieParser());

	app.use(session ({
		secret: 'secret',
		saveUninitialized: true,
		resave: true
	}));


	app.use(passport.initialize());
	app.use(passport.session());

	app.use(flash());

	app.use(function (req, res, next){
		res.locals.succes_msg = req.flash('succes_msg');
		res.locals.error_msg = req.flash('error_msg');
		res.locals.error = req.flash('error');
		next(); 
	});


	app.use(function (req, res, next){
		res.locals.errors = null;
		next();
	});
	app.use("/public/", function (req, res) {
		
	    res.sendFile(path.join(__dirname + req.originalUrl));    
	});

	app.get('/',  function(req, res){
		db.users.find(function (err, docs) {
			//console.log(docs);
			//res.render('index', {
			//	title: 'Customers',
			//	users: docs
		///	})
		});
		res.sendFile(path.join(__dirname + '/login.html'));
		//res.json(people)
	});


	app.get('/register',  function(req, res){
		db.users.find(function (err, docs) {
			//console.log(docs);
			//res.render('index', {
			//	title: 'Customers',
			//	users: docs
		///	})
		});
		res.sendFile(path.join(__dirname + '/index.html'));
		//res.json(people)
	});  


	app.get('/server/ajax' ,function (req, res){
			db.users.find(function (err, docs) {
			//console.log(docs);
			res.json(docs);
		});
	});


	app.post('/register' ,function (req, res){
			let  registerData = req.body;
			db.login.insert(registerData, function (err, result){
				if(err){
					console.log(err);
				}
				console.log(result);
			});
			res.json({ "name" : "a"});
	});


	

	app.get('/login', function (req, res){
	});


	app.post('/removeWorker' ,function (req, res){
			let  workers = req.body;
			let toJson = {
				name : workers.name,
			}
			console.log(toJson)
			db.users.remove(toJson, function (err, result){
				if(err)
				{
					console.log(err);
				}
				console.log(result);
			});
	});
	app.post('/addToDataBase' ,function (req, res){
			let  workers = req.body;
			db.users.insert(workers, function (err, result){
				if(err)
				{
					console.log(err);
				}
				console.log(result);
			});
	});

	app.post('/updateWorker', function (req, res){
		let date = req.body;
		let Name = date.name;
		let Work = date.work;
		let update = {
			name : Name,
		}
		db.users.update( update,{$set : {work : Work}}, function (err, result){
			if(err)
			{
				console.log(err);
			}
			console.log(result);
		});
	});

	app.listen(3000, function() {
			console.log('Server Started on Port 3000...')
		// body...
	});