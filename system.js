const path = require('path');
const mongojs = require('mongojs');
var db = require('mongojs')('Users',['registered']);
// Define your schema
//const Schema = mongoose.Schema;
const router = require('express').Router()

router.post('/register', (req, res)=>{
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  let userName = req.body.userName;
  let password = req.body.password;
  let email = req.body.email;
  console.log(firstName);
  console.log(lastName);
  console.log(userName);
  console.log(password);
  console.log(email);
  let user = {
    firstName: firstName,
    lastName: lastName,
    userName: userName,
    password: password,
    email: email
  }
  db.registered.insert(user, (err,result)=>{
    if(err){console.log(err)};
    console.log(result);
  });
  res.end();
});

router.post('/login', (req, res)=>{
  let userName = req.body.userName;
  let password = req.body.password;
  console.log(userName);
  console.log(password);
  let look = {
    userName: userName,
    password: password
  }

  db.registered.findOne(look,(err, doc)=> {
    if(err){console.log(err)};
    if(!doc){
      res.send(500);
    }
    console.log(doc)
    req.session.user = doc;
    res.send(200);
  });

});

router.get('/dashboard', (req, res)=>{
  if(req.session.user == null){
   res.status(500);
  }
  else {
    res.status(200).send("Welcome to super secret API");
  }
})

router.get('/logout', (req, res)=>{
  req.session.destroy();
  res.send('Wylogowano!');
})


router.get('/',  function(req, res){
	res.sendFile(path.join(__dirname + '/view/register.html'))
	});

module.exports = router;
