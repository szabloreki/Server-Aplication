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


