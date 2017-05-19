let express = require('express');
let bodyParser = require('body-parser');
let path = require('path');
let expressValidator = require('express-validator')
let mongojs = require('mongojs');
let db = mongojs('workers', ['users']);
let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))

app.use(function (req, res, next){
	res.locals.errors = null;
	next();
})

app.use("/public/", function (req, res) {
    res.sendFile(path.join(__dirname + req.originalUrl))
    
    console.log(path.join(__dirname + req.originalUrl))
})

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

app.get('/style.css', function (req, res){
	res.sendFile(path.join(__dirname + '/style.css'))
})

app.get('/',  function(req, res){
	db.users.find(function (err, docs) {
		console.log(docs);
		//res.render('index', {
		//	title: 'Customers',
		//	users: docs
	///	})
	})
	res.sendFile(path.join(__dirname + '/index.html'));
	//res.json(people)
}); 

///Changing DB
app.get('/server/ajax' ,function (req, res){
		db.users.find(function (err, docs) {
		console.log(docs);
		res.json(docs);
	})
})

app.post('/addToDataBase' ,function (req, res){
		console.log(req);
		console.log(req.body);
		let  workers = req.body;
		db.users.remove({});
		db.users.insert(workers, function (err, result){
			if(err)
			{
				console.log(err);
			}
			console.log(result);
		});
})

app.post('/users/add', function (req, res){
	req.checkBody('first_name', 'First name is Required!').notEmpty();
	req.checkBody('last_name', 'last name is Required!').notEmpty();
	req.checkBody('email', 'email is Required!').notEmpty();
	let errors = req.validationErrors();
	if(errors) {
		res.redirect('/')
		res.render('index', {
			title: 'Customers',
			users: users,
			errors: errors
		});
	}
	else {
		let newUser = {
		first_name: req.body.first_name,
		last_name: req.body.last_name,
		email: req.body.email
		}
		console.log('SUCCESS');	
	db.users.insert(newUser, function (err, result) {
			if(err){
				console.log(err);
			}

			res.redirect('/')
	});
	}
	//console.log(req.body.first_name);
});

app.listen(3000, function() {
		console.log('Server Started on Port 3000...')
	// body...
});