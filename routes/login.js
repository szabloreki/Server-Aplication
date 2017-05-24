const router = require('express').Router();
const mongojs = require('mongojs');
const db = mongojs('workers', ['users','login']);

router.post('/checkLogin' ,function (req, res){
			let  loginData = req.body;
			db.login.find(loginData,function(err,data){
					console.log(data.length);

					if(data.length >= 1){
						res.json({"login" : "true"})
					}
					else
					{
						res.json({"login" : "false"})
					}
			});
	});

module.exports = router;