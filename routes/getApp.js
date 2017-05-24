const mongojs = require('mongojs');
const db = mongojs('workers', ['users','login']);
const path = require('path');

const router = require('express').Router()

router.get('/server/ajax' ,function (req, res){
			db.users.find(function (err, docs) {
			//console.log(docs);
			res.json(docs);
		});
	});

module.exports = router;