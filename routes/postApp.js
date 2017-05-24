const mongojs = require('mongojs');
const db = mongojs('workers', ['users','login']);
const path = require('path');

const router = require('express').Router()

	router.post('/removeWorker' ,function (req, res){
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
	router.post('/addToDataBase' ,function (req, res){
			let  workers = req.body;
			db.users.insert(workers, function (err, result){
				if(err)
				{
					console.log(err);
				}
				console.log(result);
			});
	});

	router.post('/updateWorker', function (req, res){
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
	
module.exports = router;