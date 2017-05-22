	const express = require('express');
	const bodyParser = require('body-parser');
	const path = require('path');
	const expressValidator = require('express-validator')
	const mongojs = require('mongojs');
	let db = mongojs('workers', ['users']);
	let app = express();

	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({extended: false}))
	app.use(function (req, res, next){
		res.locals.errors = null;
		next();
	});
	app.use("/public/", function (req, res) {
		
	    res.sendFile(path.join(__dirname + req.originalUrl));    
	});

	app.get('/',  function(req, res){
		db.users.find(function (err, docs) {
		
		});
		res.sendFile(path.join(__dirname + '/index.html'));
	}); 

	app.get('/server/ajax' ,function (req, res){
			db.users.find(function (err, docs) {
			res.json(docs);
		});
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
		};)
	});

	app.listen(3000, function() {
			console.log('Server Started on Port 3000...')
	});
