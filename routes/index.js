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
	var memberInfo = req.body;
	console.log(memberInfo['firstName']);
	carpoolDb.collection('members').insert(memberInfo, function(err, result) {
		if(result.nInserted === 1) {
  			res.send({'status': 'success' });
		} else {
			console.log(err.message);
			if(err.message.indexOf('email_1 dup key') > -1)
  			res.send({'status': 'failure' , 'statusMsg': 'User already registered with the email ' + memberInfo.email});
		}
	});
});

module.exports = router;
