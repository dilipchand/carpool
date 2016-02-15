var express = require('express');
var router = express.Router();

var carpoolDb = undefined;
var MongoClient = require('mongodb').MongoClient;

MongoClient.connect("mongodb://localhost:27017/carpool", function(err, db) {
  if(!err) {
  	carpoolDb = db;
    console.log("We are connected");
  } else {
    console.log(err);
  }
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET home page. */
router.post('/registerUser', function(req, res, next) {
	//console.log("inside register memebers = " + req.body);
	try {
		var memberInfo = req.body;
		delete memberInfo['confirmPassword'];
		memberInfo['createdOn'] = new Date();
		carpoolDb.collection('members').insert(memberInfo, function(err, result) {
			console.log(result);
			console.log(err);
			if(err === null) {
	  			res.send({'status': 'success' });
			} else {
				console.log(err);
				if(err.message.indexOf('email_1 dup key') > -1)
	  			res.send({'status': 'failure' , 'statusMsg': 'User already registered with the email ' + memberInfo.email});
			}
		});
	} catch (err) {
		console.log(err);
	}
});

module.exports = router;
