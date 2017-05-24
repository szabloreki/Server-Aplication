const mongojs = require('mongojs');
const db = mongojs('workers', ['users','login']);
const path = require('path');

const router = require('express').Router()

	router.use(function (req, res, next){
		res.locals.errors = null;
		next();
	});
	router.use("/public/", function (req, res) {
		
	    res.sendFile(path.join(__dirname + req.originalUrl));    
	});

	router.get('/',  function(req, res){
		db.users.find(function (err, docs) {
			//console.log(docs);
			//res.render('index', {
			//	title: 'Customers',
			//	users: docs
		///	})
		});
		res.sendFile(path.join(__dirname + '/view/login.html'));
		//res.json(people)
	});


	router.get('/register',  function(req, res){
		res.sendFile(path.join(__dirname + '/view/register.html'));
		//res.json(people)
	});


	router.get('/app',  function(req, res){
		db.users.find(function (err, docs) {
			//console.log(docs);
			//res.render('index', {
			//	title: 'Customers',
			//	users: docs
		///	})
		});
		res.sendFile(path.join(__dirname + '/view/index.html'));
		//res.json(people)
	}); 
module.exports = router;