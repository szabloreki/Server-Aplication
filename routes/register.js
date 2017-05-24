const mongojs = require('mongojs');
const db = mongojs('workers', ['users','login']);
const path = require('path');

const router = require('express').Router()

router.post('/register' ,function (req, res){
			let  registerData = req.body;
			db.login.insert(registerData, function (err, result){
				if(err){
					console.log(err);
				}
				console.log(result);
			});
			res.json({ "name" : "a"});
	});


	
module.exports = router;